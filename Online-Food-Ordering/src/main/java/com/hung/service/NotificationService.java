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
        Notification notification = notificationMapper.toNotification(request);
        notificationRepository.save(notification);

        // Gửi qua WebSocket đến client đang subscribe
        messagingTemplate.convertAndSend("/topic/notifications/" + request.getReceiverId(), notification);

    }

    public List<NotificationResponse> getShopNotifications(String receiverId) {
        List<Notification> notificationList= notificationRepository.findByReceiverIdAndTypeOrderByCreatedAtDesc(receiverId, "SHOP");
        return notificationMapper.toResponseList(notificationList);
    }

    public void markAsRead(String id) {
        Notification n = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setReaded(true);
        notificationRepository.save(n);
    }
}
