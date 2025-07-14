package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodResponse {
    String name;
    String description;
    Long price;
    boolean vegetarian;
    boolean seasonal;
    List<IngredientItemResponse> ingredients;
    boolean available;
    List<String > images;
}
