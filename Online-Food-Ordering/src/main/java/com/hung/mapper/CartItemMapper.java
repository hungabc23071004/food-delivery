package com.hung.mapper;

import com.hung.dto.response.CartItemResponse;
import com.hung.entity.CartItem;
import com.hung.entity.FoodImage;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")

public interface CartItemMapper {
    @Mapping(target = "foodName", expression = "java(cartItem.getFood().getName())")
    @Mapping(
            target = "imageUrl",
            expression = "java( (cartItem.getFood() != null && cartItem.getFood().getImages() != null && !cartItem.getFood().getImages().isEmpty()) ? cartItem.getFood().getImages().get(0).getImageUrl() : null )"
    )

    CartItemResponse toCartItemResponse(CartItem cartItem);



    List<CartItemResponse> toCartItemResponseList(List<CartItem> cartItemList);


}
