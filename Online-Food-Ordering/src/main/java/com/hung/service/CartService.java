package com.hung.service;

import com.hung.dto.request.CartItemRequest;
import com.hung.dto.response.CartItemResponse;
import com.hung.dto.response.CartResponse;
import com.hung.entity.*;
import com.hung.enums.CartStatus;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.CartItemMapper;
import com.hung.mapper.CartMapper;
import com.hung.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
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
    CartItemMapper cartItemMapper;


    @Transactional
    public CartResponse addCartItem(CartItemRequest request) {
        User user = getCurrentUser();
        Shop shop = user.getShop();

        Cart cart = getOrCreateActiveCart(user, shop);

        Food food = foodRepository.findById(request.getFoodId())
                .orElseThrow(() -> new AppException(ErrorCode.FOOD_NOT_EXISTED));

        List<FoodOption > foodOptionList= foodOptionRepository.findAllByIdIn(request.getOptionIds());


        cart.getCartItems().stream()
                .filter(item -> hasSameFoodAndOptions(item, food, foodOptionList))
                .findFirst()
                .ifPresentOrElse(
                        item -> item.setQuantity(item.getQuantity() + request.getQuantity()),
                        () -> addNewCartItem(cart, food, request.getQuantity(), foodOptionList)
                );

        recalculateCart(cart);

        Cart savedCart = cartRepository.save(cart);
        return buildCartResponse(savedCart);
    }

    @Transactional
    public CartResponse updateCartItem(String cartItemId, CartItemRequest request) {
        User user = getCurrentUser();

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_EXISTED));

        Cart cart = cartItem.getCart();
        validateCartOwnership(cart, user);

        cartItem.setQuantity(request.getQuantity());

        recalculateCart(cart);

        Cart savedCart = cartRepository.save(cart);
        return buildCartResponse(savedCart);
    }

    public CartResponse clearCartItems(String id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_EXISTED));

        cart.getCartItems().clear();
        cart.setQuantity(0);
        cart.setTotalPrice(0.0);
        cart.setStatus(CartStatus.CLEARED);

        return buildCartResponse(cartRepository.save(cart));
    }


    private User getCurrentUser() {
        return userRepository.findByUsernameAndActive(
                        SecurityContextHolder.getContext().getAuthentication().getName(), true
                )
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    private Cart getOrCreateActiveCart(User user, Shop shop) {
        Cart cart = cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE);

        if (cart != null && !cart.getShop().getId().equals(shop.getId())) {
            cart.setStatus(CartStatus.EXPIRED);
            cartRepository.save(cart);
            cart = null;
        }

        if (cart == null) {
            cart = Cart.builder()
                    .user(user)
                    .shop(shop)
                    .status(CartStatus.ACTIVE)
                    .build();
        }

        return cart;
    }



    private void addNewCartItem(Cart cart, Food food, int quantity, List<FoodOption> options) {
        CartItem newItem = CartItem.builder()
                .food(food)
                .cart(cart)
                .quantity(quantity)
                .price(food.getPrice() + options.stream().mapToDouble(FoodOption::getExtraPrice).sum())
                .build();

        newItem.getOptions().clear();
        newItem.getOptions().addAll(options);
        cart.getCartItems().add(newItem);
    }

    private boolean hasSameFoodAndOptions(CartItem item, Food food, List<FoodOption> options) {
        if (!item.getFood().getId().equals(food.getId())) {
            return false;
        }

        Set<String> existingOptionIds = item.getOptions().stream()
                .map(opt -> opt.getId())
                .collect(Collectors.toSet());

        Set<String> requestOptionIds = options.stream()
                .map(opt -> opt.getId())
                .collect(Collectors.toSet());

        return existingOptionIds.equals(requestOptionIds);
    }

    private void recalculateCart(Cart cart) {
        cart.setQuantity(cart.getCartItems().stream().mapToInt(CartItem::getQuantity).sum());
        cart.setTotalPrice(cart.getCartItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum());
    }

    private void validateCartOwnership(Cart cart, User user) {
        if (!cart.getUser().getId().equals(user.getId()) || !cart.getStatus().equals(CartStatus.ACTIVE)) {
            throw new AppException(ErrorCode.CART_NOT_EXISTED);
        }
    }

    private CartResponse buildCartResponse(Cart cart) {
        CartResponse response = cartMapper.toResponse(cart);
        response.setCartItems(cartItemMapper.toCartItemResponseList(cart.getCartItems()));
        return response;
    }

    public CartResponse getCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE);
        CartResponse response = cartMapper.toResponse(cart);
        response.setCartItems(cartItemMapper.toCartItemResponseList(cart.getCartItems()));
        return response;
    }
}
