// Đặt dòng này để fix lỗi "global is not defined" trong Vite
window.global = window;

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

/**
 * Kết nối WebSocket đến backend
 * @param {string} shopId - id của shop để biết nhận thông báo cho ai
 * @param {(msg: any) => void} onMessage - callback khi nhận được tin nhắn
 */
export function connectNotificationWS(shopId, onMessage) {
  // 🧩 1. Tạo kết nối WebSocket đến backend
  const socket = new SockJS("http://localhost:8080/food/ws"); // đổi port nếu backend khác
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000, // tự kết nối lại nếu mất
  });

  // 🧩 2. Khi kết nối thành công
  stompClient.onConnect = () => {
    console.log("✅ Đã kết nối WebSocket");
    const topic = `/topic/notifications/${shopId}`;
    console.log("📡 Đăng ký nhận từ:", topic);

    // 🧩 3. Đăng ký nhận thông báo
    stompClient.subscribe(topic, (message) => {
      const data = JSON.parse(message.body);
      console.log("📨 Nhận được:", data);
      onMessage(data);
    });
  };

  // 🧩 4. Khi có lỗi
  stompClient.onWebSocketError = (err) => {
    console.error("❌ Lỗi WebSocket:", err);
  };

  stompClient.onDisconnect = () => {
    console.log("🔌 WebSocket ngắt kết nối");
  };

  // 🧩 5. Kích hoạt kết nối
  stompClient.activate();
}

/**
 * Ngắt kết nối WebSocket
 */
export function disconnectNotificationWS() {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("❎ Ngắt kết nối WebSocket");
  }
}
