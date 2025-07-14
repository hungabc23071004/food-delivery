package com.hung.Mapper;

import com.hung.dto.response.IngredientCategoryResponse;
import com.hung.dto.response.IngredientItemResponse;
import com.hung.entity.IngredientCategory;
import com.hung.entity.IngredientsItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IngredientMapper {
    @Mapping(source = "stoke", target = "stock")
    IngredientItemResponse toIngredientResponse (IngredientsItem ingredientsItem);
    IngredientCategoryResponse toIngredientCategoryResponse(IngredientCategory ingredientCategory);
    List<IngredientCategoryResponse> toIngredientCategoryResponseList(List<IngredientCategory> categories);
}
