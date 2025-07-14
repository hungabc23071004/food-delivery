package com.hung.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddCartItemRequest {
    Long foodId;
    Long quantity;
    List<String > ingredients;
}
