package com.hung.controller;

import com.hung.dto.RestaurantDto;
import com.hung.dto.request.CreateRestaurantRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.RestaurantResponse;
import com.hung.entity.Restaurant;
import com.hung.entity.User;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.UserRepository;
import com.hung.service.RestaurantService;
import com.hung.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.core.ApplicationPushBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/admin/restaurants")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminRestaurantController {

    RestaurantService restaurantService;

    UserRepository userRepository;

    @PostMapping
    public ApiResponse<RestaurantResponse> createRestaurant(@RequestBody CreateRestaurantRequest restaurant) {
        return ApiResponse.<RestaurantResponse>builder()
                .result(restaurantService.createRestaurant(restaurant))
                .build();
    }

    @PutMapping("/{id}/status")
    public ApiResponse<RestaurantResponse> updateRestaurantStatus( @PathVariable Long id){
        return ApiResponse.<RestaurantResponse>builder()
                .result(restaurantService.updateRestaurantStatus(id))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteRestaurant(@PathVariable Long id){
        restaurantService.deleteRestaurant(id);
        return ApiResponse.<String >builder()
                .result("Restaurant has been deleted successfully ")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<RestaurantResponse> getRestaurant(@PathVariable Long id){
        return ApiResponse.<RestaurantResponse>builder()
                .result(restaurantService.getRestaurantById(id))
                .build();
    }



}
