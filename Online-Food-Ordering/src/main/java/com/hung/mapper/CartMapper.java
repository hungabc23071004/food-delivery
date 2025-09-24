package com.hung.mapper;

import com.hung.dto.response.CartResponse;
import com.hung.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface CartMapper {
    @Mapping(target = "quantity",
            expression = "java(cart.getCartItems() != null ? cart.getCartItems().stream().mapToInt(com.hung.entity.CartItem::getQuantity).sum() : 0)")
    @Mapping(target = "totalPrice",
            expression = "java(cart.getCartItems() != null ? cart.getCartItems().stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum() : 0.0)")
    CartResponse toResponse(Cart cart);
}
