package com.hung.repository;

import com.hung.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface  NotificationRepository extends JpaRepository<Notification, String > {
    List<Notification> findByReceiverIdOrderByCreatedAtDesc(String receiverId);

}
