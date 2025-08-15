package com.hung.mapper;

import com.hung.dto.request.UserCreationRequest;
import com.hung.dto.response.UserResponse;
import com.hung.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);
}
