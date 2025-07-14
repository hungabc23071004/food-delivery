package com.hung.Mapper;

import com.hung.dto.request.AddressRequest;
import com.hung.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface AddressMapper {

    Address toAddress(AddressRequest request);
}
