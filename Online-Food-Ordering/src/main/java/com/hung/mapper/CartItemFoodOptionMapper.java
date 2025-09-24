package com.hung.mapper;

import com.hung.dto.response.CartItemFoodOptionResponse;
import com.hung.dto.response.CartItemResponse;
import com.hung.entity.CartItem;
import com.hung.entity.CartItemFoodOption;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")

public interface CartItemFoodOptionMapper {
    CartItemFoodOptionResponse toCartItemFoodOptionResponse(CartItemFoodOption cartItem);

    List<CartItemFoodOptionResponse> toCartItemFoodOptionResponse(List<CartItemFoodOption> cartItemList);
}
