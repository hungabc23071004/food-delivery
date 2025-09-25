package com.hung.mapper;

import com.hung.dto.response.CartResponse;
import com.hung.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface CartMapper {

    CartResponse toResponse(Cart cart);
}
