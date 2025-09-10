package com.hung.controller;

import com.hung.dto.request.UserAddressRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.UserAddressResponse;
import com.hung.service.UserAddressService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user_address")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserAddressController {

    UserAddressService userAddressService;

    @GetMapping
    public ApiResponse<List<UserAddressResponse>> getUserAddress() {
        return ApiResponse.<List<UserAddressResponse>>builder()
                .result(userAddressService.getAllUserAddresses())
                .build();
    }

    @PostMapping
    public ApiResponse<UserAddressResponse> createUserAddress(@RequestBody UserAddressRequest userAddressRequest) {
        return ApiResponse.<UserAddressResponse>builder()
                .result(userAddressService.createUserAddress(userAddressRequest))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String  > deleteUserAddress(@PathVariable String  id) {
        userAddressService.deleteUserAddress(id);
        return ApiResponse.<String>builder()
                .result("success")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<UserAddressResponse> updateUserAddress(@PathVariable String id,@RequestBody UserAddressRequest userAddressRequest) {
        return ApiResponse.<UserAddressResponse>builder()
                .result(userAddressService.updateUserAddress(id, userAddressRequest))
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<UserAddressResponse> getUserAddressDetail(@PathVariable String id) {
        return ApiResponse.<UserAddressResponse>builder()
                .result(userAddressService.getUserAddressDetail(id))
                .build();
    }

}
