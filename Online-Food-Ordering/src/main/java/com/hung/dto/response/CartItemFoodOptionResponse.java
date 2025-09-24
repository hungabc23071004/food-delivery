package com.hung.dto.response;

import lombok.Data;

@Data
public class CartItemFoodOptionResponse {
    private String id;
    private String optionName;
    private Double extraPrice;
}
