package com.hung.service;

import com.hung.Mapper.IngredientMapper;
import com.hung.dto.request.CreateIngredientCategoryRequest;
import com.hung.dto.request.CreateIngredientsItemRequest;
import com.hung.dto.response.IngredientCategoryResponse;
import com.hung.dto.response.IngredientItemResponse;
import com.hung.entity.*;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.IngredientsCategoryRepository;
import com.hung.repository.IngredientsItemRepository;
import com.hung.repository.RestaurantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class IngredientsService {

    IngredientsItemRepository ingredientsItemRepository;

    IngredientsCategoryRepository ingredientsCategoryRepository;

    RestaurantRepository restaurantRepository;

    IngredientMapper ingredientMapper;

    public IngredientCategoryResponse createIngredientCategory(CreateIngredientCategoryRequest request) throws AppException {
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId()).orElseThrow(()-> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        IngredientCategory ingredientCategory = IngredientCategory.builder().name(request.getName()).restaurant(restaurant).build();
        return  ingredientMapper.toIngredientCategoryResponse(ingredientsCategoryRepository.save(ingredientCategory)) ;
    }

    public List<IngredientCategoryResponse> findIngredientCategoryByRestaurantId(Long id){
        List<IngredientCategory> ingredientCategories= ingredientsCategoryRepository.findByRestaurantId(id);
        return ingredientMapper.toIngredientCategoryResponseList(ingredientCategories);
    }


    public IngredientItemResponse createIngredientsItem(CreateIngredientsItemRequest request) {
        IngredientCategory category =ingredientsCategoryRepository.findWithIngredientsById(request.getCategoryId());
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId()).orElseThrow(()-> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        IngredientsItem ingredientsItem = IngredientsItem.builder()
                .name(request.getName())
                .restaurant(restaurant)
                .isStoke(true)
                .build();
        category.getIngredients().add(ingredientsItem);
        ingredientsItem.setCategory(category);
        return  ingredientMapper.toIngredientResponse( ingredientsItemRepository.save(ingredientsItem));
    }

    public List<IngredientItemResponse> findRestaurantIngredientsItem(Long id){
        List<IngredientsItem> ingredientsItems= ingredientsItemRepository.findByRestaurantId(id);
        List<IngredientItemResponse> ingredientItemResponses = new ArrayList<>();
        for(IngredientsItem ingredientsItem:ingredientsItems){
            ingredientItemResponses.add(ingredientMapper.toIngredientResponse( ingredientsItem));
        }
        return ingredientItemResponses;
    }

    public IngredientItemResponse updateStock(Long id){
        IngredientsItem ingredientsItem = ingredientsItemRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.INGREDIENT_NOT_EXISTED));
        ingredientsItem.setStoke(!ingredientsItem.isStoke());
         return ingredientMapper.toIngredientResponse(ingredientsItemRepository.save(ingredientsItem)) ;
    }

}
