package com.hung.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarItemResponse {
    String foodName;

    List<String> ingredients ;

    Long quantity;

    Long totalPrice;
}
