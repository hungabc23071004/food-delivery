package com.hung.service;

import com.hung.Mapper.AddressMapper;
import com.hung.Mapper.OrderMapper;
import com.hung.dto.request.OrdersRequest;
import com.hung.dto.request.UpdateOrderRequest;
import com.hung.dto.response.OrdersResponse;
import com.hung.entity.*;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderService {

    OrderRepository orderRepository;

    OrderItemRepository orderItemRepository;

    AddressRepository addressRepository;

    UserRepository userRepository;

    RestaurantRepository restaurantRepository;

    CartRepository cartRepository;

    CartService cartService;

    AddressMapper addressMapper;

    OrderMapper orderMapper;

    private boolean isDuplicateAddress(Address existingAddress, Address newAddress) {
        return existingAddress.getStreet().equals(newAddress.getStreet()) &&
               existingAddress.getCity().equals(newAddress.getCity()) &&
               existingAddress.getProvince().equals(newAddress.getProvince()) &&
               existingAddress.getName().equals(newAddress.getName());
    }

    @Transactional
    public OrdersResponse createOrder(OrdersRequest request) {
        Address newAddress = addressMapper.toAddress(request.getDeliveryAddress());
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Address addressToUse = user.getAddresses().stream()
            .filter(addr -> isDuplicateAddress(addr, newAddress))
            .findFirst()
            .orElse(null);

        if (addressToUse == null) {
            addressToUse = addressRepository.save(newAddress);
            user.getAddresses().add(addressToUse);
            userRepository.save(user);
        }

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
            .orElseThrow(() -> new AppException(ErrorCode.RESTAURANT_NOT_EXISTED));
        Cart cart = cartRepository.findByCustomerId(user.getId());

        if (cart == null || cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new AppException(ErrorCode.CART_EMPTY);
        }

        Orders order = Orders.builder()
            .customer(user)
            .orderStatus("PENDING")
            .deliveryAddress(addressToUse)
            .restaurant(restaurant)
            .createDate(new Date())
            .build();

        List<OrderItem> orderItems = new ArrayList<>();
        for (CarItem carItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                .food(carItem.getFood())
                .quantity(carItem.getQuantity())
                .totalPrice(carItem.getTotalPrice())
                .ingredients(carItem.getIngredients())
                .order(order) // Quan trọng!
                .build();
            orderItems.add(orderItem);
        }
        order.setItems(orderItems);
        order.setTotalPrice(cartService.caculateCartTotals(cart));
        order.setTotalItem((long) orderItems.size());

        Orders savedOrder = orderRepository.save(order);

        cartService.clearCart();

        return orderMapper.toOrdersResponse(savedOrder);
    }

    public void cancelOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    public OrdersResponse updateOrder(UpdateOrderRequest request) {
        Orders order = orderRepository.findById(request.getOrderId()).orElseThrow(()-> new AppException(ErrorCode.ORSER_NOT_EXISTED));
        order.setOrderStatus(request.getOrderStatus());
        return orderMapper.toOrdersResponse(orderRepository.save(order)) ;
    }
    public List<OrdersResponse> getUserOrders() {
        User user = userRepository.findByFullName(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Orders> ordersList= orderRepository.findByCustomerId(user.getId());
        return orderMapper.toOrderResponseList(ordersList);
    }

    public List<OrdersResponse> getRestaurantOrder(Long restaurantId, String orderStatus) {
        List<Orders> orders = orderRepository.findByRestaurantId(restaurantId);
        if(orderStatus!=null){
            orders = orders.stream().filter(order-> order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
        }
        return orderMapper.toOrderResponseList(orders);
    }

}
