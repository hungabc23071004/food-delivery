package com.hung.controller;

import com.hung.dto.request.FoodRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.FoodResponse;
import com.hung.service.FoodService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FoodController {
    FoodService foodService;

    @PostMapping( consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<String> createFood(
            @RequestPart("food") FoodRequest foodRequest,
            @RequestPart("images") List<MultipartFile> images
    ) throws IOException {
        foodRequest.setImages(images); // gắn list ảnh vào DTO để service xử lý
        foodService.createFood(foodRequest);
        return ApiResponse.<String>builder()
                .result("Food is created successfully")
                .build();
    }


    @GetMapping("/category/{id}")
    public ApiResponse<List<FoodResponse>> getFoodByCategoryId(@PathVariable String id) {
        return ApiResponse.<List<FoodResponse>>builder()
                .result(foodService.getFoodByCategoryId(id))
                .build();
    }

}
