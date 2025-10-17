package com.hung.repository;

import com.hung.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String > {
    Page<Order> findByUserId(String id, Pageable pageable);
    Page<Order> findByUserIdAndStatus(String id, String status, Pageable pageable);
    Page<Order> findByShopId(String shopId, Pageable pageable);
}
