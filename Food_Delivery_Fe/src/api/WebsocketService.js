// api/websocketService.js
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;
const subscriptions = {};
const pendingSubscribeQueue = [];
let isConnecting = false;
let reconnectAttempts = 0;

const MAX_RECONNECT_DELAY = 30000;
const BASE_DELAY = 2000;

const getTokenHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const calcDelay = (attempt) =>
  Math.min(MAX_RECONNECT_DELAY, BASE_DELAY * Math.pow(1.5, attempt));

export const connectWebSocket = (onConnected) => {
  if (stompClient && (stompClient.connected || isConnecting)) {
    console.log("⚠️ WebSocket already connecting or connected");
    if (stompClient.connected && onConnected) onConnected();
    return;
  }

  console.log("🔌 Attempting WebSocket connection...");
  isConnecting = true;

  const socketUrl =
    (import.meta.env.VITE_WS_URL || "http://localhost:8080") + "/food/ws";

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

      // clear duplicates before replay
      const uniqueQueue = [];
      const seen = new Set();
      while (pendingSubscribeQueue.length) {
        const { topic, callback } = pendingSubscribeQueue.shift();
        if (!seen.has(topic)) {
          seen.add(topic);
          uniqueQueue.push({ topic, callback });
        }
      }

      uniqueQueue.forEach(({ topic, callback }) => subscribe(topic, callback));
      if (onConnected) onConnected();
    },
    (err) => {
      console.error("❌ WebSocket connect error:", err);
      isConnecting = false;
      stompClient = null;
      reconnectAttempts += 1;
      const delay = calcDelay(reconnectAttempts);
      console.log(`🔁 Reconnecting in ${Math.round(delay / 1000)}s...`);
      setTimeout(() => connectWebSocket(onConnected), delay);
    }
  );
};

export const disconnectWebSocket = () => {
  if (!stompClient) {
    console.warn("⚠️ No WebSocket instance found");
    return;
  }

  try {
    Object.keys(subscriptions).forEach((t) => {
      subscriptions[t]?.unsubscribe?.();
      delete subscriptions[t];
    });

    if (stompClient.connected) {
      console.log("🔌 Disconnecting WebSocket...");
      stompClient.disconnect(() => {
        console.log("❌ WebSocket disconnected");
      });
    } else {
      console.warn("⚠️ Cannot disconnect — not connected yet");
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
  if (!stompClient || !stompClient.connected) {
    if (!pendingSubscribeQueue.some((x) => x.topic === topic)) {
      console.warn("⚠️ WebSocket not ready — queueing subscribe:", topic);
      pendingSubscribeQueue.push({ topic, callback });
    }
    return;
  }

  if (subscriptions[topic]) {
    console.log(`⚠️ Already subscribed to ${topic}`);
    return;
  }

  console.log(`🛰️ Subscribing to topic: ${topic}`);
  const sub = stompClient.subscribe(topic, (msg) => {
    try {
      const body = JSON.parse(msg.body);
      console.log(`📩 Message received on ${topic}:`, body);
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
      console.log(`🧹 Unsubscribed from: ${topic}`);
    } catch (e) {
      console.warn("⚠️ unsubscribe error", e);
    }
    delete subscriptions[topic];
  } else {
    const idx = pendingSubscribeQueue.findIndex((x) => x.topic === topic);
    if (idx >= 0) {
      pendingSubscribeQueue.splice(idx, 1);
      console.log(`🧾 Removed pending subscription: ${topic}`);
    }
  }
};

export const sendMessage = (destination, body = {}, headers = {}) => {
  if (!stompClient || !stompClient.connected) {
    console.warn("⚠️ Cannot send — WebSocket not connected");
    return;
  }
  try {
    console.log(`🚀 Sending message to ${destination}:`, body);
    stompClient.send(destination, headers, JSON.stringify(body));
  } catch (e) {
    console.error("❌ sendMessage error:", e);
  }
};
