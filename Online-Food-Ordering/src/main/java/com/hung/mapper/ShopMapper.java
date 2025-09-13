package com.hung.mapper;

import com.hung.dto.request.CategoryRequest;
import com.hung.dto.request.ShopAddressRequest;
import com.hung.dto.request.ShopCategoryRequest;
import com.hung.dto.request.ShopRequest;
import com.hung.dto.response.CategoryResponse;
import com.hung.dto.response.ShopCategoryResponse;
import com.hung.dto.response.ShopResponse;
import com.hung.dto.response.ShoppAddressResponse;
import com.hung.entity.Category;
import com.hung.entity.Shop;
import com.hung.entity.ShopAddress;
import com.hung.entity.ShopCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShopMapper {
    @Mapping(target="logoUrl", ignore = true)
    ShopCategory toShopCategory(ShopCategoryRequest shopCategory);

    ShopCategoryResponse toShopCategoryResponse(ShopCategory shopCategory);

    List<ShopCategoryResponse> toShopCategoryResponseList(List<ShopCategory> shopCategoryList);

    ShopResponse toShopResponse(Shop shop);

    Shop toShop(ShopRequest shopRequest);

    ShopAddress toShopAddress(ShopAddressRequest shopAddress);
    ShoppAddressResponse toShopAddressResponse (ShopAddress shopAddress);

    Category  toCategory(CategoryRequest shopCategoryRequest);
    CategoryResponse toCategoryResponse(Category category);
    List<CategoryResponse> toCategoryResponseList(List<Category> categoryList);

    List<ShopResponse> toShopResponseList(List<Shop> shopList);
}
