package com.hung.controller;

import com.hung.dto.request.CategoryRequest;
import com.hung.dto.request.ShopRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.CategoryResponse;
import com.hung.dto.response.ShopResponse;
import com.hung.service.ShopService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShopController {

    ShopService shopService;

    @PostMapping
    ApiResponse<ShopResponse> createShop (@RequestBody ShopRequest shopRequest) {
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.createShop(shopRequest))
                .build();
    }

    @PostMapping("/category")
    ApiResponse<Object> createShopCategory (@RequestBody CategoryRequest request) {
        return ApiResponse.builder()
                .result(shopService.createCategory(request))
                .build();
    }

    @GetMapping("/category")
    ApiResponse<List<CategoryResponse>> getShopCategory () {
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(shopService.getAllCategories())
                .build();
    }



}
