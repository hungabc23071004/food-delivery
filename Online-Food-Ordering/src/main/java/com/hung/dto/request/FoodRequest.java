package com.hung.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodRequest {

        String name;
        String description;
        Double price;
        Boolean available;
        String categoryId;

        private List<FoodOptionGroupRequest> optionGroup;
        private List<MultipartFile> images;


}
