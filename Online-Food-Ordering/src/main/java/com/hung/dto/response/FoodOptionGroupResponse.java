package com.hung.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class FoodOptionGroupResponse {
    private String id;
    private String name;
    private List<FoodOptionResponse> options;
}
