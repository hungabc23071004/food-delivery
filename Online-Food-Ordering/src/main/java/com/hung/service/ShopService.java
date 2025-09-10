package com.hung.service;

import com.hung.dto.request.CategoryRequest;
import com.hung.dto.request.ShopRequest;
import com.hung.dto.response.CategoryResponse;
import com.hung.dto.response.ShopResponse;
import com.hung.entity.Shop;
import com.hung.entity.User;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.ShopMapper;
import com.hung.repository.CategoryRepository;
import com.hung.repository.ShopRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShopService {
    ShopRepository shopRepository;
    ShopMapper shopMapper;
    UserRepository userRepository;
    CategoryRepository categoryRepository;

    public ShopResponse createShop(ShopRequest shopRequest) {
        Shop shop = shopMapper.toShop(shopRequest);
        shop.setShopAddress(shopMapper.toShopAddress(shopRequest.getShopAddress()));
        User user= userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(), true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        shop.setUser(user);
        shopRepository.save(shop);
        return shopMapper.toShopResponse(shop);
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        return shopMapper.toCategoryResponse(categoryRepository.save(shopMapper.toCategory(categoryRequest))) ;
    }


    public List<CategoryResponse> getAllCategories() {
        return shopMapper.toCategoryResponseList(categoryRepository.findAll());
    }

}
