package com.hung.dto.request;

import lombok.Data;

@Data
public class FoodOptionRequest {
    private String optionName;   // Ví dụ: "M", "L", "Trân châu"
    private Double extraPrice; // Giá cộng thêm (có thể null nếu free)
}
