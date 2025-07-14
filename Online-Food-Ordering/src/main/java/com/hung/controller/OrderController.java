package com.hung.controller;

import com.hung.dto.request.OrdersRequest;
import com.hung.dto.request.UpdateOrderRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.OrdersResponse;
import com.hung.entity.Orders;
import com.hung.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

    OrderService orderService;


    @PostMapping
    public ApiResponse<OrdersResponse> createOrder(@RequestBody OrdersRequest request   ) {
        return ApiResponse.<OrdersResponse>builder()
                .result(orderService.createOrder(request))
                .build();
    }

    @GetMapping("/user")
    public ApiResponse<List<OrdersResponse>> getOrderHistory(){
        return ApiResponse.<List<OrdersResponse>>builder()
                .result(orderService.getUserOrders())
                .build();
    }
    @GetMapping("/restaurant/{id}")
    public ApiResponse<List<OrdersResponse>> getOrderRestaurant(@RequestParam String orderStatus, @PathVariable Long id){
        return ApiResponse.<List<OrdersResponse>>builder()
                .result(orderService.getRestaurantOrder(id,orderStatus))
                .build();
    }

    @PutMapping()
    public ApiResponse<OrdersResponse> updateOrder(@RequestBody UpdateOrderRequest request){
        return ApiResponse.<OrdersResponse>builder()
                .result(orderService.updateOrder(request))
                .build();
    }

}
