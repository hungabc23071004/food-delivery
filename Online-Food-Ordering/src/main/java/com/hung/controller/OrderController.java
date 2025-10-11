package com.hung.controller;

import com.hung.dto.request.OrderRequest;
import com.hung.dto.request.OrderStatusRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.OrderResponse;
import com.hung.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderController {
    OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.createOrder(orderRequest))
                .build();
    }

    @GetMapping
    public ApiResponse<List<OrderResponse>> getOrdersByUserId() {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrderByUserId())
                .build();
    }

    @PatchMapping("/update/status")
    public ApiResponse<OrderResponse> updateOrderStatus(@RequestBody OrderStatusRequest orderRequest) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.updateOrderStatus(orderRequest))
                .build();
    }
    @PatchMapping("/cancel/{id}")
    public ApiResponse<OrderResponse> cancelOrder(@PathVariable String  id) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.cancelOrderByUser(id))
                .build();
    }

}