package com.hung.service;

import com.hung.dto.request.*;
import com.hung.dto.response.CategoryResponse;
import com.hung.dto.response.ShopResponse;
import com.hung.entity.Category;
import com.hung.entity.Shop;
import com.hung.entity.ShopCategory;
import com.hung.entity.User;
import com.hung.enums.ShopStatus;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.ShopMapper;
import com.hung.repository.CategoryRepository;
import com.hung.repository.ShopCategoryRepository;
import com.hung.repository.ShopRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShopService {
    ShopRepository shopRepository;
    ShopMapper shopMapper;
    UserRepository userRepository;
    CategoryRepository categoryRepository;
    ShopCategoryRepository shopCategoryRepository;

    static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));


    public ShopResponse createShop(ShopRequest shopRequest) {
        Shop shop = shopMapper.toShop(shopRequest);
        shop.setShopAddress(shopMapper.toShopAddress(shopRequest.getShopAddress()));
        User user= userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(), true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        shop.setUser(user);
        shop.setStatus(ShopStatus.ONLINE);
        shopRepository.save(shop);
        return shopMapper.toShopResponse(shop);
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        Category category =shopMapper.toCategory(categoryRequest);
        User user= userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(), true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        category.setShop(user.getShop());
        return shopMapper.toCategoryResponse(categoryRepository.save(category));
    }




    public ShopResponse decorateShop(ShopDecorationRequest shopRequest) throws IOException {

        Path uploadDir = CURRENT_FOLDER.resolve("uploads").resolve("images");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        User user = userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(),true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Shop shop = user.getShop();

        if(shopRequest.getLogo()!=null) {
            String logoUrl = UUID.randomUUID() + "_" + shopRequest.getLogo().getOriginalFilename();
            Path filePath = uploadDir.resolve(logoUrl);

            // Ghi file (Spring hỗ trợ sẵn)
            shopRequest.getLogo().transferTo(filePath.toFile());
            shop.setLogo(logoUrl);
        }
        if(shopRequest.getBanner()!=null) {
            String bannerUrl = UUID.randomUUID() + "_" + shopRequest.getBanner().getOriginalFilename();
            Path filePath = uploadDir.resolve(bannerUrl);

            // Ghi file (Spring hỗ trợ sẵn)
            shopRequest.getBanner().transferTo(filePath.toFile());
            shop.setBanner(bannerUrl);
        }
        return shopMapper.toShopResponse(shopRepository.save(shop));
    }

    public ShopResponse pickCategoryForShop(CategoryForShopRequest request) {
        List<ShopCategory> categories = shopCategoryRepository.findAllByIdIn(request.getShopCategoryIds());
        User user = userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(),true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Shop shop = user.getShop();
        shop.getCategories() .addAll(categories);
        return shopMapper.toShopResponse(shopRepository.save(shop));
    }

    public ShopResponse changeStatus() {
        User user = userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(),true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Shop shop = user.getShop();
        if(shop.getStatus()== ShopStatus.OFFLINE){
            shop.setStatus(ShopStatus.ONLINE);
        }
        else shop.setStatus(ShopStatus.OFFLINE);
        shopRepository.save(shop);
        return shopMapper.toShopResponse(shopRepository.save(shop));
    }


    public List<ShopResponse> getShopByCategoryId(String id) {
        return shopMapper.toShopResponseList(shopRepository.findByCategories_Id(id));
    }

    public Page<ShopResponse> getAllShop(Pageable pageable) {
        return shopRepository.findAll(pageable).map(shopMapper::toShopResponse);
    }

    public ShopResponse getShopById(String id) {
        return shopMapper.toShopResponse(shopRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.SHOP_NOT_EXISTED)));
    }

    public List<CategoryResponse> getCategoryByShopId(String id) {
        return shopMapper.toCategoryResponseList(categoryRepository.findByShop_Id(id));
    }


}
