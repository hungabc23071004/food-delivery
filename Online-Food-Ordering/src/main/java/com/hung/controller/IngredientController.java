package com.hung.controller;

import com.hung.dto.request.CreateIngredientCategoryRequest;
import com.hung.dto.request.CreateIngredientsItemRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.IngredientCategoryResponse;
import com.hung.dto.response.IngredientItemResponse;
import com.hung.entity.IngredientCategory;
import com.hung.entity.IngredientsItem;
import com.hung.service.IngredientsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/ingredients")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IngredientController {

    IngredientsService ingredientsService;

    @PostMapping("/category")
    public ApiResponse<IngredientCategoryResponse> createIngredientCategory(@RequestBody CreateIngredientCategoryRequest request) {
        return ApiResponse.<IngredientCategoryResponse>builder()
                .result(ingredientsService.createIngredientCategory(request))
                .build();
    }

    @PostMapping
    public ApiResponse<IngredientItemResponse> createIngredientsItem(@RequestBody CreateIngredientsItemRequest request) {
        return ApiResponse.<IngredientItemResponse>builder()
                .result(ingredientsService.createIngredientsItem(request))
                .build();
    }

    @PutMapping("/{id}/stoke")
    public ApiResponse<IngredientItemResponse> updateIngredientStock(@PathVariable Long id){
        return ApiResponse.<IngredientItemResponse>builder()
                .result(ingredientsService.updateStock(id))
                .build();
    }

    @GetMapping("/restaurant/{id}")
    public ApiResponse<List<IngredientItemResponse>> getRestaurantIngredients(@PathVariable Long id){
        return ApiResponse.<List<IngredientItemResponse>>builder()
                .result(ingredientsService.findRestaurantIngredientsItem(id))
                .build();
    }

    @GetMapping("/restaurant/{id}/category")
    public ApiResponse<List<IngredientCategoryResponse>> getRestaurantCategory(@PathVariable Long id){
        return ApiResponse.<List<IngredientCategoryResponse>>builder()
                .result(ingredientsService.findIngredientCategoryByRestaurantId(id))
                .build();
    }


}
