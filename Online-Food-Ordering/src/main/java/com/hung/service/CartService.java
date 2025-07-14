package com.hung.service;

import com.hung.Mapper.CartMapper;
import com.hung.dto.request.AddCartItemRequest;
import com.hung.dto.response.CarItemResponse;
import com.hung.dto.response.CartResponse;
import com.hung.entity.CarItem;
import com.hung.entity.Cart;
import com.hung.entity.Food;
import com.hung.entity.User;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.CartItemRepository;
import com.hung.repository.CartRepository;
import com.hung.repository.FoodRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartService {

    CartRepository cartRepository;

    CartItemRepository cartItemRepository;

    FoodRepository foodRepository;

    UserRepository userRepository;

    CartMapper cartMapper;

    public CarItemResponse addItemToCart (AddCartItemRequest request){
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Cart cart = cartRepository.findByCustomerId(user.getId());
        Food food = foodRepository.findById(request.getFoodId()).orElseThrow(()-> new AppException(ErrorCode.FOOD_NOT_EXISTED));

        for( CarItem cartItem: cart.getItems()){
            if(cartItem.getFood().getId() == request.getFoodId()){
                return updateCartItemQuantity(cartItem.getId(), request.getQuantity());
            }
        }
        CarItem carItem = CarItem.builder()
                .cart(cart)
                .food(food)
                .ingredients(request.getIngredients())
                .quantity(request.getQuantity())
                .totalPrice(request.getQuantity()*food.getPrice())
                .build();
        cart.getItems().add(carItem); // Đảm bảo thêm vào list
        cart.setTotal(caculateCartTotals(cart)); // TÍNH LẠI TOTAL
        cartRepository.save(cart);
        return cartMapper.toCarItemResponse(carItem);
    }

    public CarItemResponse updateCartItemQuantity (Long id, Long quantity){
        CarItem carItem = cartItemRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.CART_ITEM_NOT_EXISTED));
        carItem.setQuantity(carItem.getQuantity()+quantity);
        carItem.setTotalPrice(carItem.getQuantity() * carItem.getFood().getPrice());
        cartItemRepository.save(carItem);
        Cart cart = cartRepository.findById(carItem.getCart().getId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        cart.setTotal(caculateCartTotals(cart)); // TÍNH LẠI TOTAL
        cartRepository.save(cart);
        return cartMapper.toCarItemResponse(carItem);
    }

    public CartResponse removeItemFromCart (Long id){
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Cart cart = cartRepository.findByCustomerId(user.getId());
        List<CarItem> items = cartItemRepository.findByCartId(cart.getId())
            .stream()
            .filter(item -> !item.getId().equals(id))
            .collect(Collectors.toList());
        cart.setItems(items);
        cart.setTotal(caculateCartTotals(cart)); // TÍNH LẠI TOTAL

        cartRepository.save(cart);
        return cartMapper.toCartResponse(cart);
    }


    public Long caculateCartTotals(Cart cart){
        Long total = 0L;
        for(CarItem carItem: cart.getItems()){
            total += carItem.getTotalPrice();
        }
        return total;
    }

    public CartResponse findCart(){
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));

        return cartMapper.toCartResponse(cartRepository.findByCustomerId(user.getId()));
    }

    public CartResponse clearCart(){
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Cart cart = cartRepository.findByCustomerId(user.getId());
        cart.getItems().clear();
        cart.setTotal(0L); // hoặc gọi caculateCartTotals(cart)
        cartRepository.save(cart);
        return cartMapper.toCartResponse(cart);
    }

}
