package com.hung.Mapper;
import com.hung.dto.response.CarItemResponse;
import com.hung.dto.response.CartResponse;
import com.hung.entity.CarItem;
import com.hung.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface CartMapper {

    @Mapping(target = "foodName", expression = "java(carItem.getFood().getName())")
    CarItemResponse toCarItemResponse(CarItem carItem);

    CartResponse toCartResponse(Cart cart);

}
