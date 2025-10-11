package com.hung.mapper;

import com.hung.dto.request.OrderRequest;
import com.hung.dto.response.OrderItemResponse;
import com.hung.dto.response.OrderItermOptionResponse;
import com.hung.dto.response.OrderResponse;
import com.hung.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface OrderMapper {

    @Mapping(target = "id", ignore = true)
    ShippingAddress toShippingAddress(UserAddress userAddress);

    @Mapping(target = "id",ignore = true)
    OrderItermOption toOrderItem(FoodOption foodOption);

    List<OrderItermOption> toOrderItemOptionList( List<FoodOption> foodOptionList);

    @Mapping(target = "id", ignore = true)
    OrderItem toOrderItem(CartItem cartItem);

    List<OrderItem> toOrderItemList(List<CartItem> cartItemList);

    @Mapping(target="status", ignore = true)
    @Mapping(target = "id", ignore = true)
    Order toOrder ( Cart cart);

    OrderResponse toOrderResponse(Order order);

    @Mapping(target = "foodName", expression = "java(orderItem.getFood().getName())")
    @Mapping(
            target = "imageUrl",
            expression = "java( (orderItem.getFood() != null && orderItem.getFood().getImages() != null && !orderItem.getFood().getImages().isEmpty()) ? orderItem.getFood().getImages().get(0).getImageUrl() : null )"
    )
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    List<OrderItemResponse> toListOrderItemResponse(List<OrderItem> orderItemList);

    OrderItermOptionResponse toOrderItermOptionResponse(OrderItermOption orderItermOption);

    List<OrderItermOptionResponse> toListOrderItermOptionResponse(List<OrderItermOption> orderItermOptionList);
    List<OrderResponse> toOrderResponseList(List<Order> orderList);
}
