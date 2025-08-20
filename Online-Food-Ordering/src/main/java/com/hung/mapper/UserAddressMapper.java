package com.hung.mapper;

import com.hung.dto.request.UserAddressRequest;
import com.hung.dto.response.UserAddressResponse;
import com.hung.entity.UserAddress;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")

public interface UserAddressMapper {
    UserAddress toUserAddress(UserAddressRequest userAddress);

    UserAddressResponse toUserAddressResponse(UserAddress userAddress);

    List<UserAddressResponse> toUserAddressResponseList(List<UserAddress> userAddresses);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void toUserAddress(@MappingTarget UserAddress userAddress, UserAddressRequest userAddressRequest);
}
