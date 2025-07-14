package com.hung.controller;

import com.hung.dto.request.AddCartItemRequest;
import com.hung.dto.request.UpdateCartItemRequest;
import com.hung.dto.response.AddressResponse;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.CarItemResponse;
import com.hung.dto.response.CartResponse;
import com.hung.entity.CarItem;
import com.hung.entity.Cart;
import com.hung.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {

    CartService cartService;


    @PostMapping("/add")
    public ApiResponse<CarItemResponse> addItemToCart(@RequestBody AddCartItemRequest addCartItemRequest) {
        return ApiResponse.<CarItemResponse>builder()
                .result(cartService.addItemToCart(addCartItemRequest))
                .build();
    }

    @PutMapping("cart-item/update")
    public ApiResponse<CarItemResponse> updateCartItem(@RequestBody UpdateCartItemRequest updateCartItemRequest) {
        return ApiResponse.<CarItemResponse>builder()
                .result(cartService.updateCartItemQuantity(updateCartItemRequest.getCartItemId(), updateCartItemRequest.getQuantity()))
                .build();
    }

    @DeleteMapping("/cart-item/{id}/remove")
    public ApiResponse<CartResponse> removeCartItem(@PathVariable Long id) {
        return ApiResponse.<CartResponse>builder()
                .result(cartService.removeItemFromCart(id))
                .build();
    }

    @PutMapping("/clear")
    public ApiResponse<CartResponse> clearCart() {
        return ApiResponse.<CartResponse>builder()
                .result(cartService.clearCart())
                .build();
    }

    @GetMapping
    public ApiResponse<CartResponse> getCart() {
        return ApiResponse.<CartResponse>builder()
                .result(cartService.findCart())
                .build();
    }

}
