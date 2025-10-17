package com.hung.service;

import com.hung.dto.request.OrderRequest;
import com.hung.dto.request.OrderStatusRequest;
import com.hung.dto.response.OrderResponse;
import com.hung.entity.*;
import com.hung.enums.CartStatus;
import com.hung.enums.OrderStatus;
import com.hung.enums.Payment;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.OrderMapper;
import com.hung.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
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
    UserRepository userRepository;
    NotificationService notificationService;
    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Cart cart = cartRepository.findById(orderRequest.getCartId()).orElseThrow(()-> new AppException(ErrorCode.CART_NOT_EXISTED));
        ShippingAddress shippingAddress =  orderMapper.toShippingAddress(userAddressRepository.findById(orderRequest.getUserAddressId()).orElseThrow(()-> new AppException(ErrorCode.USER_ADDRESS_NOT_EXISTED)));
        Order order = orderMapper.toOrder(cart);
        order.setShippingAddress(shippingAddress);
        order.setShippingFee(BigDecimal.valueOf(orderRequest.getShippingFee()));
        order.setTotalDiscount(BigDecimal.valueOf(orderRequest.getDiscount()));
        List<OrderItem> orderItemList= orderMapper.toOrderItemList(cart.getCartItems());
        for (OrderItem orderItem : orderItemList) {
            orderItem.setOrder(order);
            for(OrderItermOption option: orderItem.getOptions()){
                option.setOrderItem(orderItem);
            }
        }

        order.setOrderItems(orderItemList);
        order.setSubtotal(cart.getTotalPrice());
        order.setTotal(
                BigDecimal.valueOf(cart.getTotalPrice())
                        .add(BigDecimal.valueOf(orderRequest.getShippingFee())) // +
                        .subtract(order.getTotalDiscount())       // -
        );
        order.setPayment(Payment.valueOf(orderRequest.getPayment()));
        order.setStatus(OrderStatus.PENDING);
        shippingAddress.setOrder(order);
        orderRepository.save(order);
        cart.setStatus(CartStatus.CLEARED);
        cartRepository.save(cart);
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
//        notificationService.sendNotification(
//                cart.getShop().getId(),
//                "SHOP",
//                "Có đơn hàng mới",
//                "Bạn có một đơn hàng mới từ " + order.getUser().getUsername()
//        );
        return orderResponse;

    }


    public Page<OrderResponse> getOrderByUserId(Pageable pageable){
        User user = userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(), true).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Page<Order> orderList = orderRepository.findByUserId(user.getId(),pageable);
        return orderList.map(order -> orderMapper.toOrderResponse(order));
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


    public OrderResponse updateOrderStatus(OrderStatusRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (!isValidStatusTransition(order.getStatus(), OrderStatus.valueOf(request.getStatus()))) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }
        order.setStatus(OrderStatus.valueOf(request.getStatus()));

        // 5. Nếu shop chuyển sang SHIPPING mà là COD → chưa thanh toán
        if (OrderStatus.valueOf(request.getStatus()) == OrderStatus.DELIVERED && order.getPayment() == Payment.COD) {
            order.setStatus(OrderStatus.PAID);
        }
        orderRepository.save(order);
        return orderMapper.toOrderResponse(order);
    }

    public OrderResponse cancelOrderByUser(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

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


    public OrderResponse getOrderById(String id) {
        return orderMapper.toOrderResponse(orderRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.ORDER_NOT_FOUND)));
    }

    public Page<OrderResponse> getShopOrderById(String id, Pageable pageable) {
        return orderRepository.findByShopId(id, pageable).map(order -> orderMapper.toOrderResponse(order));
    }
}
