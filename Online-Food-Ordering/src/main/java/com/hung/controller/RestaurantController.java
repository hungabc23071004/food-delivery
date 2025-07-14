package com.hung.controller;

import com.hung.dto.RestaurantDto;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.RestaurantResponse;
import com.hung.entity.Restaurant;
import com.hung.service.RestaurantService;
import com.hung.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RestaurantController {

    RestaurantService restaurantService;

    UserService userService;

    @GetMapping("/search")
    public ApiResponse<List<Restaurant>> searchRestaurant(String keyword) {
        return ApiResponse.<List<Restaurant>>builder()
                .result(restaurantService.getRestaurants(keyword))
                .build();
    }

    @GetMapping
    public   ApiResponse<List<RestaurantResponse>> getAllRestaurants() {
        return ApiResponse.<List<RestaurantResponse>>builder().result(restaurantService.getAllRestaurant()).build();
    }

    @PutMapping("/{id}/add-favorites")
    public ApiResponse<RestaurantDto> addFavorites(@PathVariable Long id){
        return ApiResponse.<RestaurantDto>builder()
                .result(restaurantService.addToFavorites(id))
                .build();
    }

}
