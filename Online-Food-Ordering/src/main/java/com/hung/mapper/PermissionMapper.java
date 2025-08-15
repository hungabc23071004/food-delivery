package com.hung.mapper;

import com.hung.dto.request.PermissionRequest;
import com.hung.dto.response.PermissionResponse;
import com.hung.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}