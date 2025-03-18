import { Client } from '@stomp/stompjs';
import { getTokenFromLS } from './localstore.service';

const WS_URL = "ws://localhost:8080/ws/websocket"; // WebSocket không có HTTP, chỉ dùng ws://

const token = getTokenFromLS("token");

export const stompClient = new Client({
  brokerURL: WS_URL, // Kết nối WebSocket trực tiếp (Không dùng SockJS)
  connectHeaders: {
    Authorization: `Bearer ${token}`, // Gửi token trong headers
  },
  // debug: (msg) => console.log("[STOMP]", msg),
  reconnectDelay: 5000, // Tự động reconnect sau 5s nếu mất kết nối
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,

  onStompError: (frame) => {
  },
});

export const connectStomp = () => {
  return new Promise<void>((resolve) => {
    stompClient.activate();

    stompClient.onConnect = () => {

      // console.log("✅ STOMP Connected");
      resolve(); // Đánh dấu kết nối đã xong
    };
  });
};

export const disconnectStomp = () => stompClient.deactivate();


