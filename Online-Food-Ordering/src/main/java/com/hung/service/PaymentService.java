package com.hung.service;

import com.hung.config.VnpayConfig;
import com.hung.dto.response.OrderResponse;
import com.hung.dto.response.VnpayResponse;
import com.hung.entity.Order;
import com.hung.enums.OrderStatus;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.OrderMapper;
import com.hung.repository.OrderRepository;
import com.hung.util.VnpayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class PaymentService {

    VnpayConfig vnPayConfig;
    OrderRepository orderRepository;
    OrderMapper orderMapper;

    public VnpayResponse createVnPayPayment( HttpServletRequest request) {
        Order order = orderRepository.findById(request.getParameter("orderId")).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        Long amount = (long) (order.getTotal().doubleValue() *100L);

        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        vnpParamsMap.put("vnp_IpAddr", VnpayUtil.getIpAddress(request));
        //build query url
        vnpParamsMap.put("vnp_TxnRef", order.getId());
        String queryUrl = VnpayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VnpayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VnpayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_Payurl() + "?" + queryUrl;
        return  VnpayResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }


    public OrderResponse handleVnPayCallback(HttpServletRequest request) {
        // Lấy tất cả tham số VNPay trả về
        Map<String, String> vnpParams = VnpayUtil.getVnpayParams(request);
        String vnpResponseCode = vnpParams.get("vnp_ResponseCode");
        String vnpTxnRef = vnpParams.get("vnp_TxnRef"); // Mã orderId bạn đã truyền khi tạo payment

        // Kiểm tra đơn hàng tồn tại
        Order order = orderRepository.findById(vnpTxnRef)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        // Kiểm tra chữ ký bảo mật
        String vnpSecureHash = vnpParams.get("vnp_SecureHash");
        vnpParams.remove("vnp_SecureHash");
        vnpParams.remove("vnp_SecureHashType");

        String signValue = VnpayUtil.hmacSHA512(vnPayConfig.getSecretKey(), VnpayUtil.getPaymentURL(vnpParams, false));

        if (!signValue.equals(vnpSecureHash)) {
            throw new AppException(ErrorCode.INVALID_SIGNATURE);
        }

        // Nếu thanh toán thành công
        if ("00".equals(vnpResponseCode)) {
            order.setStatus(OrderStatus.PAID); // hoặc OrderStatus.PAID nếu bạn có enum
            orderRepository.save(order);
        }
        else throw new AppException(ErrorCode.PAYMENT_ERROR);

        // Tạo phản hồi trả về FE
        return orderMapper.toOrderResponse(order);
    }

}
