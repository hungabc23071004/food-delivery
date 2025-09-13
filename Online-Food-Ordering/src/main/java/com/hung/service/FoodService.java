package com.hung.service;

import com.hung.dto.request.FoodOptionGroupRequest;
import com.hung.dto.request.FoodRequest;
import com.hung.dto.response.FoodOptionGroupResponse;
import com.hung.dto.response.FoodOptionResponse;
import com.hung.dto.response.FoodResponse;
import com.hung.entity.*;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.FoodMapper;
import com.hung.repository.CategoryRepository;
import com.hung.repository.FoodRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FoodService {
    FoodRepository foodRepository;
    FoodMapper foodMapper;
    CategoryRepository categoryRepository;
    UserRepository userRepository;

    static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));



    public void createFood(FoodRequest foodRequest) throws IOException {
        // Map request -> entity
        Food food = foodMapper.toFood(foodRequest);

        // Map option groups + options
        for (FoodOptionGroupRequest groupRequest : foodRequest.getOptionGroup()) {
            FoodOptionGroup group = foodMapper.toFoodOptionGroup(groupRequest);
            List<FoodOption> options = foodMapper.toFoodOption(groupRequest.getOptions());
            group.setOptions(options);
            food.getOptionGroup().add(group);
        }

        // Gán shop từ user đang login
        User user = userRepository.findByUsernameAndActive(
                SecurityContextHolder.getContext().getAuthentication().getName(),
                true
        ).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        food.setShop(user.getShop());

        // Gán category nếu có
        if (foodRequest.getCategoryId() != null) {
            Category category = categoryRepository.findById(foodRequest.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
            food.setCategory(category);
        }



        // Tạo thư mục uploads/images nếu chưa có
        Path uploadDir = CURRENT_FOLDER.resolve("uploads").resolve("images");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        // Xử lý danh sách ảnh
        for (MultipartFile image : foodRequest.getImages()) {
            // Tạo tên file an toàn (UUID tránh trùng/tấn công path traversal)
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);

            // Ghi file (Spring hỗ trợ sẵn)
            image.transferTo(filePath.toFile());

            // Lưu tên file vào DB (có thể lưu cả relative path nếu cần)
            FoodImage foodImage = FoodImage.builder()
                    .imageUrl(filename) // chỉ lưu tên file, sau này build URL trả về
                    .build();
            food.getImages().add(foodImage);
        }

        // Lưu food
        foodRepository.save(food);
    }

    public List<FoodResponse> getFoodByCategoryId(String id) {
        List<Food> foodList = foodRepository.findByCategory_Id(id);
        List<FoodResponse> responseList = new ArrayList<>();
        for (Food food : foodList) {
            FoodResponse response = foodMapper.toFoodResponse(food);
            for(FoodOptionGroup group : food.getOptionGroup()) {
                FoodOptionGroupResponse groupResponse = foodMapper.toFoodOptionGroupResponse(group);
                for(FoodOption option : group.getOptions()) {
                    FoodOptionResponse optionResponse = foodMapper.toFoodOptionResponse(option);
                    groupResponse.getOptions().add(optionResponse);
                }
            }
            responseList.add(response);
        }
        return responseList;
    }
}
