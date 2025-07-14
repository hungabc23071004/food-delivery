package com.hung.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateIngredientsItemRequest {
    String name;
    Long categoryId;
    Long restaurantId;
}
