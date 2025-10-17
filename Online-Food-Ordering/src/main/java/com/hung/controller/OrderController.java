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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ApiResponse<Page<OrderResponse>> getOrdersByUserId( @RequestParam(defaultValue = "1") int page,
                                                               @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        return ApiResponse.<Page<OrderResponse>>builder()
                .result(orderService.getOrderByUserId(pageable))
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

    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> getOrderById(@PathVariable String id) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.getOrderById(id))
                .build();
    }

    @GetMapping("/shop/{id}")
    public ApiResponse<Page<OrderResponse>> getShopOrderById(@PathVariable String id, @RequestParam(defaultValue = "1") int page,
                                                             @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        return ApiResponse.<Page<OrderResponse>>builder()
                .result(orderService.getShopOrderById(id, pageable))
                .build();
    }

}