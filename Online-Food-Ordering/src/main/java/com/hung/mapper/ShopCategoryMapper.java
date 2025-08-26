package com.hung.mapper;

import com.hung.dto.request.ShopCategoryRequest;
import com.hung.dto.response.ShopCategoryResponse;
import com.hung.entity.ShopCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShopCategoryMapper  {
    @Mapping(target="logoUrl", ignore = true)
    ShopCategory toShopCategory(ShopCategoryRequest shopCategory);

    ShopCategoryResponse toShopCategoryResponse(ShopCategory shopCategory);

    List<ShopCategoryResponse> toShopCategoryResponseList(List<ShopCategory> shopCategoryList);
}
