package com.hung.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)

public class IngredientCategoryResponse {
    String name;
    List<IngredientItemResponse> ingredients;
}
