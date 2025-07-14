package com.hung.service;

import com.hung.Mapper.RestaurantMapper;
import com.hung.dto.request.CreateCategoryRequest;
import com.hung.dto.response.CategoryResponse;
import com.hung.entity.Category;
import com.hung.entity.Restaurant;
import com.hung.entity.User;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.CategoryRepository;
import com.hung.repository.RestaurantRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryService {

    RestaurantRepository restaurantRepository;

    CategoryRepository categoryRepository;

    UserRepository userRepository;

    RestaurantMapper restaurantMapper;

    public CategoryResponse createCategory(CreateCategoryRequest request) {
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId()).orElseThrow(()-> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        Category category = Category.builder()
                .name(request.getName())
                .restaurant(restaurant)
                .build();
        categoryRepository.save(category);

        return CategoryResponse.builder()
                .name(category.getName())
                .restaurant(restaurantMapper.toRestaurantResponse(restaurant))
                .build();

        }

    public List<CategoryResponse > findCategoryByRestaurantId(){
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Restaurant restaurant = restaurantRepository.findByOwnerId(user.getId());
        List<Category> categoryList = categoryRepository.findByRestaurantId(restaurant.getId());
        List<CategoryResponse> categoryResponseList = new ArrayList<>();
        for(Category category : categoryList){
            categoryResponseList.add(CategoryResponse.builder()
                            .name(category.getName())
                            .restaurant(restaurantMapper.toRestaurantResponse(restaurant))
                    .build());
        }
        return categoryResponseList;
    }


}
