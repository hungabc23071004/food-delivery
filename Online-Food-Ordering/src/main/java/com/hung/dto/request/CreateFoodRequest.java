package com.hung.dto.request;

import com.hung.entity.Category;
import com.hung.entity.IngredientsItem;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateFoodRequest {
    String name;
    String description;
    Long price;
    Long categoryId;
    List<String > images;

    Long restaurantId;
    boolean vegetarian;
    boolean seasonal;
    List<IngredientsItem> ingredients;
}
