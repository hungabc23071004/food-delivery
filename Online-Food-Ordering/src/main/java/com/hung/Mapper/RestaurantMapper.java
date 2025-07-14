package com.hung.Mapper;

import com.hung.dto.request.CreateRestaurantRequest;
import com.hung.dto.response.RestaurantResponse;
import com.hung.entity.Restaurant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RestaurantMapper {

    RestaurantResponse toRestaurantResponse(Restaurant restaurant);

    Restaurant toRestaurant(CreateRestaurantRequest createRestaurantRequest);
}
