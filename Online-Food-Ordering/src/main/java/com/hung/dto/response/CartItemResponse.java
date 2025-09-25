package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemResponse {
    String id;   // id cartItem
    String foodName;
    String imageUrl;
    Double price;
    Integer quantity;
    List<CartItemFoodOptionResponse> foodOptions=new ArrayList<>();
}