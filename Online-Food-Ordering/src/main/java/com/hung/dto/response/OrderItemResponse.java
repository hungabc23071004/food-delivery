package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemResponse {
    String id;
    Integer quantity;
    Double price;
    String foodName;
    String imageUrl;
    List<OrderItermOptionResponse> options = new ArrayList<>();
}
