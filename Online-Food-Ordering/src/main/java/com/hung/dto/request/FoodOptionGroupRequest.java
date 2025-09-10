package com.hung.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodOptionGroupRequest {
    String name;  // Ví dụ: "Size", "Topping"
    List<FoodOptionRequest> options;
}
