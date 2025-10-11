package com.hung.controller;

import com.hung.dto.request.ShippingFeeRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.ShippingFeeResponse;
import com.hung.service.ShipService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ship")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShipController {
    ShipService shipService;

    @PostMapping("/fee")
    public ApiResponse<ShippingFeeResponse> createShippingFee(@RequestBody ShippingFeeRequest request) {
        return ApiResponse.<ShippingFeeResponse>builder()
                .result(shipService.calculateFinalFee(request))
                .build();
    }
}
