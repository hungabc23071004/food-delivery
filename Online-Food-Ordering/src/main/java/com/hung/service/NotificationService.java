package com.hung.service;

import com.hung.entity.Notification;
import com.hung.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public Notification sendNotification(String receiverId, String type, String title, String message) {
        Notification notification = Notification.builder()
                .receiverId(receiverId)
                .type(type)
                .title(title)
                .message(message)
                .build();

        notificationRepository.save(notification);

        // Gửi qua WebSocket đến client đang subscribe
        messagingTemplate.convertAndSend("/topic/notifications/" + receiverId, notification);
        log.info("📢 Sent notification to {} [{}]: {}", receiverId, type, message);

        return notification;
    }

    public List<Notification> getNotifications(String receiverId) {
        return notificationRepository.findByReceiverIdOrderByCreatedAtDesc(receiverId);
    }

    public void markAsRead(String id) {
        Notification n = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setRead(true);
        notificationRepository.save(n);
    }
}
