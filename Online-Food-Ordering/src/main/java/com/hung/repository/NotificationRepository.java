package com.hung.repository;

import com.hung.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface  NotificationRepository extends JpaRepository<Notification, String > {
    Page<Notification> findByReceiverIdAndTypeOrderByCreatedAtDesc(String receiverId, String type, Pageable pageable);

}
