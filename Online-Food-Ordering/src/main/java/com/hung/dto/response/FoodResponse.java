package com.hung.dto.response;


import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class FoodResponse {
    private String id;
    private String name;
    private String description;
    private Double price;
    private Boolean available;
    private LocalDateTime createdAt;

    private String shopId;
    private String categoryId;

    private List<FoodOptionGroupResponse> optionGroups;
    private List<String> imageUrls;
}
