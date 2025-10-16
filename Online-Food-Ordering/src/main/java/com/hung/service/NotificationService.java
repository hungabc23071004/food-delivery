package com.hung.service;

import com.hung.dto.request.NotificationRequest;
import com.hung.dto.response.NotificationResponse;
import com.hung.entity.Notification;
import com.hung.mapper.NotificationMapper;
import com.hung.repository.NotificationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationService {

    NotificationRepository notificationRepository;
    SimpMessagingTemplate messagingTemplate;
    NotificationMapper notificationMapper;

    public void  sendNotification(NotificationRequest request) {
        for(String id: request.getReceiverId()){
        Notification notification = notificationMapper.toNotification(request);
        notification.setReceiverId(id);
        notification.setType("SHOP");
        notificationRepository.save(notification);
        // Gửi qua WebSocket đến client đang subscribe
        messagingTemplate.convertAndSend("/topic/notifications/" + request.getReceiverId(), notification);}

    }

    public Page<NotificationResponse> getShopNotifications(String receiverId, Pageable pageable) {
        Page<Notification> notificationList= notificationRepository.findByReceiverIdAndTypeOrderByCreatedAtDesc(receiverId, "SHOP",pageable);
        return notificationList.map(notificationMapper:: toResponse);
    }

    public void markAsRead(String id) {
        Notification n = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setReaded(true);
        notificationRepository.save(n);
    }
}
