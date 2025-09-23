package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemResponse {
    String cartItemId;   // id cartItem
     String foodId;
     String foodName;
     int quantity;
     double unitPrice;
     double subTotal;     // unitPrice * quantity + options
     List<CartItemOptionResponse> options;
}
