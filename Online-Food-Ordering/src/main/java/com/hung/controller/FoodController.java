package com.hung.controller;

import com.hung.dto.request.CreateFoodRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.FoodResponse;
import com.hung.service.FoodService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FoodController {

    FoodService foodService;

    @PostMapping
    public ApiResponse<FoodResponse> createFood(@RequestBody CreateFoodRequest request) {
        return ApiResponse.<FoodResponse>builder()
                .result(foodService.createFood(request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteFood(@PathVariable Long id){
        foodService.deleteFood(id);
        return ApiResponse.<String>builder()
                .result("Food has been deleted successfully")
                .build();

    }

    @PostMapping("/{id}")
    public ApiResponse<FoodResponse> updateFoodAvaibilityStatus(@PathVariable Long id){
        return ApiResponse.<FoodResponse>builder()
                .result(foodService.updateAvailibiityStatus(id))
                .build();
    }


    @GetMapping("/restaurant/{restaurantId}")
    public ApiResponse<List<FoodResponse>> getRestaurantFood(@PathVariable Long restaurantId){
        return ApiResponse.<List<FoodResponse>>builder()
                .result(foodService.getRestaurantFoods(restaurantId))
                .build();
    }

}
