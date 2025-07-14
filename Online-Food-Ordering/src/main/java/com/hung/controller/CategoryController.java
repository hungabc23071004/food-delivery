package com.hung.controller;

import com.hung.dto.request.CreateCategoryRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.CategoryResponse;
import com.hung.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/admin/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {

    CategoryService categoryService;


    @PostMapping
    public ApiResponse<CategoryResponse> createCategory(@RequestBody CreateCategoryRequest createCategoryRequest) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.createCategory(createCategoryRequest))
                .build();
    }

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getRestaurantCategory() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.findCategoryByRestaurantId())
                .build();
    }

}
