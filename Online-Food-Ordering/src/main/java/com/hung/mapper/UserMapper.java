package com.hung.mapper;

import com.hung.dto.request.UserCreationRequest;
import com.hung.dto.request.UserUpdateRequest;
import com.hung.dto.response.UserResponse;
import com.hung.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")

public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
