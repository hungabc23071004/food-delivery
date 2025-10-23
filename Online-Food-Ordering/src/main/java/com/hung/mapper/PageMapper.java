package com.hung.mapper;

import com.hung.dto.response.PagedResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PageMapper {
    PagedResponse toPagedResponse(org.springframework.data.domain.Page<?> page);
}
