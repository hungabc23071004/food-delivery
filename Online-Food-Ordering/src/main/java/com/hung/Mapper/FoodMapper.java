package com.hung.Mapper;

import com.hung.dto.request.CreateFoodRequest;
import com.hung.dto.response.FoodResponse;
import com.hung.entity.Food;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface FoodMapper {
    @Mapping(source = "vegetarian", target = "isVegetarian")
    @Mapping(source = "seasonal", target = "isSeasonal")
    Food toFood (CreateFoodRequest request);

    FoodResponse toFoodResponse (Food food);

    List<FoodResponse> toFoodResponseList (List<Food> foodList);
}
