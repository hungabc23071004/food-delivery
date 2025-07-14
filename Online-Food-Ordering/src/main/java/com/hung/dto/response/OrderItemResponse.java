package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class OrderItemResponse {
    String foodName;

    Long quantity;

    Long totalPrice;

    List<String> ingredients=new ArrayList<>();
}
