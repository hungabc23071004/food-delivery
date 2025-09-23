package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemOptionResponse {
         String id;       // option id
         String name;     // tên option
         double extraPrice;
    }

