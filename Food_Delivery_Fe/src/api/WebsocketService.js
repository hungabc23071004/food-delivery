// api/websocketService.js
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;
const subscriptions = {};
const pendingSubscribeQueue = []; // { topic, callback }
let isConnecting = false;
let reconnectAttempts = 0;

const MAX_RECONNECT_DELAY = 30000; // 30s
const baseDelay = 2000;

const getTokenHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const calcDelay = (attempt) =>
  Math.min(MAX_RECONNECT_DELAY, baseDelay * Math.pow(1.5, attempt));

export const connectWebSocket = (onConnected) => {
  if (stompClient && stompClient.connected) {
    console.log("⚠️ WebSocket already connected");
    if (onConnected) onConnected();
    return;
  }
  if (isConnecting) return;
  isConnecting = true;

  const socketUrl =
    (process.env.REACT_APP_WS_URL || "http://localhost:8080") + "/food/ws";
  const socket = new SockJS(socketUrl);
  stompClient = Stomp.over(socket);
  stompClient.debug = null;

  const headers = getTokenHeader();

  stompClient.connect(
    headers,
    () => {
      console.log("✅ WebSocket connected");
      isConnecting = false;
      reconnectAttempts = 0;
      // drain pending subscribe queue
      while (pendingSubscribeQueue.length) {
        const { topic, callback } = pendingSubscribeQueue.shift();
        subscribe(topic, callback);
      }
      if (onConnected) onConnected();
    },
    (err) => {
      console.error("❌ WebSocket connect error:", err);
      isConnecting = false;
      stompClient = null;
      reconnectAttempts += 1;
      const delay = calcDelay(reconnectAttempts);
      console.log(`🔁 Reconnect in ${Math.round(delay / 1000)}s`);
      setTimeout(() => connectWebSocket(onConnected), delay);
    }
  );
};

export const disconnectWebSocket = () => {
  if (!stompClient) return;
  try {
    Object.keys(subscriptions).forEach((t) => {
      subscriptions[t]?.unsubscribe?.();
      delete subscriptions[t];
    });
    // ensure disconnect only once
    try {
      stompClient.disconnect(() => {
        console.log("❌ WebSocket disconnected");
      });
    } catch (e) {
      console.warn("⚠️ stomp disconnect error", e);
    }
  } catch (err) {
    console.error("❌ Error while disconnecting:", err);
  } finally {
    stompClient = null;
    isConnecting = false;
    pendingSubscribeQueue.length = 0;
  }
};

export const subscribe = (topic, callback) => {
  // if not connected yet, push to pending queue
  if (!stompClient || !stompClient.connected) {
    console.warn("⚠️ WebSocket not connected — queueing subscribe:", topic);
    pendingSubscribeQueue.push({ topic, callback });
    return;
  }

  if (subscriptions[topic]) {
    console.log(`⚠️ Already subscribed to ${topic}`);
    return;
  }

  const sub = stompClient.subscribe(topic, (msg) => {
    try {
      const body = JSON.parse(msg.body);
      callback(body);
    } catch (e) {
      console.error("❌ Error parsing message:", e);
    }
  });
  subscriptions[topic] = sub;
  console.log(`📡 Subscribed: ${topic}`);
};

export const unsubscribe = (topic) => {
  if (subscriptions[topic]) {
    try {
      subscriptions[topic].unsubscribe();
    } catch (e) {
      console.warn("⚠️ unsubscribe error", e);
    }
    delete subscriptions[topic];
    console.log(`🧹 Unsubscribed from: ${topic}`);
  } else {
    // nếu đang ở queue thì loại bỏ
    const idx = pendingSubscribeQueue.findIndex((x) => x.topic === topic);
    if (idx >= 0) pendingSubscribeQueue.splice(idx, 1);
  }
};

export const sendMessage = (destination, body = {}, headers = {}) => {
  if (!stompClient || !stompClient.connected) {
    console.warn("⚠️ Cannot send — WebSocket not connected");
    return;
  }
  try {
    stompClient.send(destination, headers, JSON.stringify(body));
  } catch (e) {
    console.error("❌ sendMessage error:", e);
  }
};
