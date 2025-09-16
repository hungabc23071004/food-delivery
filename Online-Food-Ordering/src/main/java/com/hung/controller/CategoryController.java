package com.hung.controller;

import com.hung.dto.request.CategoryRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.CategoryResponse;
import com.hung.service.ShopService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryController {
    ShopService shopService;
// xử lý thực đơn của shop
    @PostMapping()
    ApiResponse<Object> createShopCategory (@RequestBody CategoryRequest request) {
        return ApiResponse.builder()
                .result(shopService.createCategory(request))
                .build();
    }

    @GetMapping("/shop/{id}")
    ApiResponse<List<CategoryResponse>> getAllShopCategory(@PathVariable String id) {
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(shopService.getCategoryByShopId(id))
                .build();
    }


}
