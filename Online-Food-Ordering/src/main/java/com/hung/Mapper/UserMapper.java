package com.hung.Mapper;

import com.hung.dto.request.UserCreateRequest;
import com.hung.dto.response.UserResponse;
import com.hung.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser (UserCreateRequest request);
    UserResponse toUserRespone(User user);
}
