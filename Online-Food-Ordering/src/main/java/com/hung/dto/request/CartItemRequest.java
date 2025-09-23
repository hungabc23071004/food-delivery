package com.hung.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class CartItemRequest {
    private String foodId;              // id món ăn
    private Integer quantity;           // số lượng
    private List<String> optionIds;     // danh sách option id (ví dụ: "size L", "extra cheese")
}
