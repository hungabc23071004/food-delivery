package com.hung.controller;

import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.OrderResponse;
import com.hung.dto.response.VnpayResponse;
import com.hung.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentController {
    PaymentService paymentService;


    @GetMapping("/vn-pay")
    public ApiResponse<VnpayResponse> pay(
            HttpServletRequest request) {
        return ApiResponse.<VnpayResponse>builder()
                .result(paymentService.createVnPayPayment(request))
                .build();
    }



    @GetMapping("/vn-pay-callback")
    public ApiResponse<OrderResponse> payCallbackHandler(HttpServletRequest request) {
       return ApiResponse.<OrderResponse>builder()
               .result(paymentService.handleVnPayCallback(request))
               .build();
    }
}
