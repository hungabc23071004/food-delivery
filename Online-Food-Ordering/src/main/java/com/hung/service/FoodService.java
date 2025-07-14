package com.hung.service;

import com.hung.Mapper.FoodMapper;
import com.hung.dto.request.CreateFoodRequest;
import com.hung.dto.response.FoodResponse;
import com.hung.entity.Category;
import com.hung.entity.Food;
import com.hung.entity.Restaurant;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.CategoryRepository;
import com.hung.repository.FoodRepository;
import com.hung.repository.RestaurantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FoodService {

    FoodRepository foodRepository;

    FoodMapper foodMapper;

    CategoryRepository categoryRepository;

    RestaurantRepository restaurantRepository;

    public FoodResponse createFood(CreateFoodRequest createFoodRequest) {
        Category category = categoryRepository.findById(createFoodRequest.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        Restaurant restaurant = restaurantRepository.findById(createFoodRequest.getRestaurantId())
                .orElseThrow(() -> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        Food food = foodMapper.toFood(createFoodRequest);
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setCreationDate(Date.valueOf(LocalDate.now()));
        return foodMapper.toFoodResponse(foodRepository.save(food));
    }

    public void deleteFood(Long id) {
        Food food = foodRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.FOOD_NOT_EXISTED));
        food.setRestaurant(null);
        foodRepository.save(food);
    }

    public FoodResponse updateAvailibiityStatus (Long id){
        Food food = foodRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.FOOD_NOT_EXISTED));
        food.setAvailable(!food.isAvailable());
        return foodMapper.toFoodResponse( foodRepository.save(food));
    }
    public List<FoodResponse> getRestaurantFoods(Long id){
        List<Food> foodList=  foodRepository.findByRestaurantId(id);
        return foodMapper.toFoodResponseList(foodList);
    }
}
