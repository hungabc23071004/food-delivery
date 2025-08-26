package com.hung.controller;

import com.hung.dto.request.ShopCategoryRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.ShopCategoryResponse;
import com.hung.service.ShopCategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/shop_category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShopCategoryController {

    ShopCategoryService shopCategoryService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ShopCategoryResponse> createCategory(@ModelAttribute ShopCategoryRequest shopCategoryRequest) throws IOException {
        return ApiResponse.<ShopCategoryResponse>builder()
                .result(shopCategoryService.createShopCategory(shopCategoryRequest))
                .build();
    }

    @GetMapping
    public ApiResponse<List<ShopCategoryResponse>>  getAllCategoryRoot() {
        return ApiResponse.<List<ShopCategoryResponse>>builder()
                .result(shopCategoryService.getAllShopCategoriesRoot())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<List<ShopCategoryResponse>> getCategoryByRoodId(@PathVariable String id) {
        return ApiResponse.<List<ShopCategoryResponse>>builder()
                .result(shopCategoryService.getShopCategoriesByParentId(id))
                .build();
    }

}
