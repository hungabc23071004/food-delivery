package com.hung.Mapper;

import com.hung.dto.response.OrderItemResponse;
import com.hung.dto.response.OrdersResponse;
import com.hung.entity.OrderItem;
import com.hung.entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface OrderMapper {

    @Mapping(target = "foodName", expression = "java(orderItem.getFood().getName())")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    OrdersResponse toOrdersResponse(Orders orders);

    List<OrdersResponse> toOrderResponseList(List<Orders> orders);
}
