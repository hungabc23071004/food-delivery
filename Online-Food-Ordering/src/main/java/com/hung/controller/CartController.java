package com.hung.controller;

import com.hung.dto.request.CartItemRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.CartResponse;
import com.hung.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {
        CartService cartService;

        @PostMapping
        public ApiResponse<CartResponse> addCartItem(@RequestBody CartItemRequest cartItemRequest) {
            return ApiResponse.<CartResponse>builder()
                    .result(cartService.addCartItem(cartItemRequest))
                    .build();
        }

        @PutMapping("/{id}/clear")
        public ApiResponse<CartResponse> clearCartItem(@PathVariable String  id) {
            return ApiResponse.<CartResponse>builder()
                    .result(cartService.clearCartItems(id))
                    .build();
        }

        @PatchMapping("/{id}/update")
        public ApiResponse<CartResponse> updateCartItem(@PathVariable String id, @RequestBody CartItemRequest cartItemRequest) {
            return ApiResponse.<CartResponse>builder()
                    .result(cartService.updateCartItem(id, cartItemRequest))
                    .build();
        }
        @GetMapping()
        public ApiResponse<CartResponse> getCartItems() {
            return ApiResponse.<CartResponse>builder()
                    .result(cartService.getCart())
                    .build();
        }

        
}
