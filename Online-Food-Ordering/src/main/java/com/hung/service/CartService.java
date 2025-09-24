package com.hung.service;

import com.hung.dto.request.CartItemRequest;
import com.hung.dto.response.CartItemResponse;
import com.hung.dto.response.CartResponse;
import com.hung.entity.*;
import com.hung.enums.CartStatus;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.CartMapper;
import com.hung.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {
    CartMapper cartMapper;
    CartRepository cartRepository;
    UserRepository userRepository;
    FoodOptionRepository foodOptionRepository;
    FoodRepository foodRepository;
    CartItemRepository cartItemRepository;

    @Transactional
    public CartResponse addCartItem(CartItemRequest request) {
        User user = userRepository.findByUsernameAndActive(
                SecurityContextHolder.getContext().getAuthentication().getName(), true
        ).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Shop shop = user.getShop();
        Cart cart = cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE.toString());

        if (cart == null || !cart.getShop().getId().equals(shop.getId())) {
            if (cart != null) {
                cart.setStatus(CartStatus.EXPIRED);
                cartRepository.save(cart);
            }

            cart = Cart.builder()
                    .user(user)
                    .shop(shop)
                    .status(CartStatus.ACTIVE)
                    .build();
        }


        Food food = foodRepository.findById(request.getFoodId())
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_EXISTED));

        List<FoodOption> foodOptionList = foodOptionRepository.findAllByIdIn(request.getOptionIds());
        List<CartItemFoodOption> cartItemFoodOptions= new ArrayList<>();
        for(FoodOption foodOption : foodOptionList) {
            cartItemFoodOptions.add(CartItemFoodOption.builder()
                            .optionName(foodOption.getOptionName())
                            .foodOption(foodOption)
                            .extraPrice(foodOption.getExtraPrice())
                    .build());
        }
        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> isSameCartItem(item, food, cartItemFoodOptions))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            CartItem cartItem = CartItem.builder()
                    .food(food)
                    .cart(cart)
                    .quantity(request.getQuantity())
                    .price(food.getPrice() + cartItemFoodOptions.stream().mapToDouble(CartItemFoodOption::getExtraPrice).sum())
                    .build();

            cartItem.getFoodOptions().addAll(cartItemFoodOptions);
            cart.getCartItems().add(cartItem);
        }
        CartResponse cartResponse = cartMapper.toResponse(cartRepository.save(cart));
        return cartResponse;
    }

    private boolean isSameCartItem(CartItem item, Food food, List<CartItemFoodOption> options) {
        // So sánh Food
        if (!item.getFood().getId().equals(food.getId())) {
            return false;
        }

        // Lấy các option hiện có trong cart item
        Set<String> existingOptionIds = item.getFoodOptions().stream()
                .map(cartItemFoodOption -> cartItemFoodOption.getFoodOption().getId())
                .collect(Collectors.toSet());

        // Lấy các option từ request
        Set<String> requestOptionIds = options.stream()
                .map(cartItemFoodOption -> cartItemFoodOption.getFoodOption().getId())
                .collect(Collectors.toSet());

        return existingOptionIds.equals(requestOptionIds);
    }



    public CartResponse clearCartItems(String id) {
        Cart cart = cartRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.CART_NOT_EXISTED));
        cart.getCartItems().clear();
        return cartMapper.toResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse updateCartItem(String cartItemId, CartItemRequest request) {
        // 1. Lấy user hiện tại
        User user = userRepository.findByUsernameAndActive(
                SecurityContextHolder.getContext().getAuthentication().getName(), true
        ).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // 2. Tìm cartItem theo id
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_EXISTED));

        // 3. Kiểm tra quyền: cartItem phải thuộc cart ACTIVE của user
        Cart cart = cartItem.getCart();
        if (!cart.getUser().getId().equals(user.getId()) ||
                !cart.getStatus().equals(CartStatus.ACTIVE)) {
            throw new AppException(ErrorCode.CART_NOT_EXISTED);
        }

        // 4. Update số lượng
        cartItem.setQuantity(request.getQuantity());

        // 5. Recalculate price (đơn giá cho 1 sản phẩm)
        double basePrice = cartItem.getFood().getPrice();
        double optionPrice = cartItem.getFoodOptions()
                .stream()
                .mapToDouble(CartItemFoodOption::getExtraPrice)
                .sum();
        cartItem.setPrice(basePrice + optionPrice);

        // 6. Lưu cartItem (JPA sẽ tự flush vì transactional)
        cartItemRepository.save(cartItem);

        // 7. Trả về CartResponse (có tổng quantity & totalPrice)
        return cartMapper.toResponse(cartRepository.save(cart));
    }

}
