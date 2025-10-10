package com.hung.service;

import com.hung.dto.request.OrderRequest;
import com.hung.dto.response.OrderResponse;
import com.hung.entity.Cart;
import com.hung.entity.Order;
import com.hung.entity.ShippingAddress;
import com.hung.entity.Shop;
import com.hung.enums.OrderStatus;
import com.hung.enums.Payment;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.OrderMapper;
import com.hung.repository.CartRepository;
import com.hung.repository.OrderRepository;
import com.hung.repository.ShopRepository;
import com.hung.repository.UserAddressRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    CartRepository cartRepository;
    OrderMapper orderMapper;
    OrderRepository orderRepository;
    UserAddressRepository userAddressRepository;
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Cart cart = cartRepository.findById(orderRequest.getCartId()).orElseThrow(()-> new AppException(ErrorCode.CART_NOT_EXISTED));
        ShippingAddress shippingAddress =  orderMapper.toShippingAddress(userAddressRepository.findById(orderRequest.getUserAddressId()).orElseThrow(()-> new AppException(ErrorCode.USER_ADDRESS_NOT_EXISTED)));
        Order order = orderMapper.toOrder(cart);
        order.setShippingAddress(shippingAddress);
        order.setShippingFee(BigDecimal.valueOf(orderRequest.getShippingFee()));
        order.setOrderItems(orderMapper.toOrderItemList(cart.getCartItems()));
        order.setSubtotal(cart.getTotalPrice());
        order.setTotal(BigDecimal.valueOf(cart.getTotalPrice()+ orderRequest.getShippingFee()));
        order.setPayment(Payment.valueOf(orderRequest.getPayment()));
        order.setStatus(OrderStatus.PENDING);
        orderRepository.save(order);
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        return orderResponse;

    }


    List<OrderResponse> getOrderByUserId(String userId){
        List<Order> orderList = orderRepository.findByUserId(userId);
        return orderMapper.toOrderResponseList(orderList);
    }

    private boolean isValidStatusTransition(OrderStatus current, OrderStatus next) {
        return switch (current) {
            case PENDING -> next == OrderStatus.ACCEPTED || next == OrderStatus.CANCELED;
            case ACCEPTED -> next == OrderStatus.PREPARING || next == OrderStatus.CANCELED;
            case PREPARING -> next == OrderStatus.SHIPPING || next == OrderStatus.CANCELED;
            case SHIPPING -> next == OrderStatus.DELIVERED || next == OrderStatus.FAILED;
            case DELIVERED -> next == OrderStatus.COMPLETED || next == OrderStatus.PAID;
            default -> false;
        };
    }

    @Transactional
    public OrderResponse updateOrderStatus(String orderId, OrderStatus newStatus, String shopId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (!order.getShop().getId().equals(shopId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        if (!isValidStatusTransition(order.getStatus(), newStatus)) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }
        order.setStatus(newStatus);

        // 5. Nếu shop chuyển sang SHIPPING mà là COD → chưa thanh toán
        if (newStatus == OrderStatus.DELIVERED && order.getPayment() == Payment.COD) {
            order.setStatus(OrderStatus.PAID);
        }
        orderRepository.save(order);
        return orderMapper.toOrderResponse(order);
    }

    public OrderResponse cancelOrderByUser(String orderId, String userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if (!order.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        if (!canUserCancel(order.getStatus())) {
            throw new AppException(ErrorCode.CANNOT_CANCEL_ORDER);
        }
        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);

        if (order.getPayment() == Payment.BANKING) {
            // gọi PaymentService.refund(order)
        }
        return orderMapper.toOrderResponse(order);
    }

    private boolean canUserCancel(OrderStatus status) {
        return status == OrderStatus.PENDING || status == OrderStatus.ACCEPTED;
    }



}
