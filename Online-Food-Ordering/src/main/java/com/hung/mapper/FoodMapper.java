package com.hung.mapper;

import com.hung.dto.request.FoodOptionGroupRequest;
import com.hung.dto.request.FoodOptionRequest;
import com.hung.dto.request.FoodRequest;
import com.hung.dto.response.FoodOptionGroupResponse;
import com.hung.dto.response.FoodOptionResponse;
import com.hung.dto.response.FoodResponse;
import com.hung.entity.Food;
import com.hung.entity.FoodOption;
import com.hung.entity.FoodOptionGroup;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FoodMapper {
    @Mapping(target="optionGroup", ignore = true)
    Food toFood(FoodRequest food);
    FoodOptionGroup toFoodOptionGroup(FoodOptionGroupRequest foodOptionGroup);
    FoodOption toFoodOption(FoodOptionRequest foodOption);
    List<FoodOptionGroup> toFoodOptionGroup(List<FoodOptionGroupRequest> foodOptionGroup);
    List<FoodOption>  toFoodOption(List<FoodOptionRequest> foodOption);

    FoodOptionResponse toFoodOptionResponse(FoodOption foodOption);
    FoodOptionGroupResponse toFoodOptionGroupResponse(FoodOptionGroup foodOptionGroup);
    FoodResponse toFoodResponse(Food food);
}
