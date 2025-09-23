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
public class CartResponse {
    int quantity;
    double totalPrice;
    List<CartItemResponse> responseList=new ArrayList<>();
}
