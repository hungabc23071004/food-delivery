package com.hung.controller;

import com.hung.dto.request.*;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.PagedResponse;
import com.hung.dto.response.ShopResponse;
import com.hung.service.ShopService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShopController {

    ShopService shopService;

    @PostMapping
    ApiResponse<ShopResponse> createShop (@RequestBody ShopRequest shopRequest) {
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.createShop(shopRequest))
                .build();
    }



    @PostMapping(value = "/decorate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<ShopResponse> decorateShop (@ModelAttribute ShopDecorationRequest shopRequest) throws IOException {
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.decorateShop(shopRequest))
                .build();
    }

    @PostMapping("/pick/category")
    ApiResponse<ShopResponse> pickCategoryForShop (@RequestBody CategoryForShopRequest shopCategoryRequest)  {
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.pickCategoryForShop(shopCategoryRequest))
                .build();
    }

    @PatchMapping("/change/status")
    ApiResponse<ShopResponse> changeShopStatus(){
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.changeStatus())
                .build();
    }

    @GetMapping("/category/{id}")
    ApiResponse<List<ShopResponse>> getShopByCategoryId (@PathVariable String  id) {
        return ApiResponse.<List<ShopResponse>>builder()
                .result(shopService.getShopByCategoryId(id))
                .build();

    }
    @GetMapping
    ApiResponse<PagedResponse<ShopResponse>> getAllShop (
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.<PagedResponse<ShopResponse>>builder()
                .result(shopService.getAllShop(pageable))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ShopResponse> getShopByid (@PathVariable String id) {
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.getShopById(id))
                .build();
    }

    @GetMapping ("/my_shop")
    ApiResponse<ShopResponse> getMyShop () {
        return ApiResponse.<ShopResponse>builder()
                .result(shopService.getMyShop())
                .build();
    }


}
