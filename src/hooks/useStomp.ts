import { useEffect, useState } from "react";
import { connectStomp, disconnectStomp } from "../services/stompClient";
import { subscribeToTopic } from "../services/stompService";
import type { StompSubscription } from "@stomp/stompjs";
import type { msgType } from "../types/message.type";

export const useStomp = (topic: string) => {
  const [msg, setMsg] = useState<msgType>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connect = async () => {
      await connectStomp(); // Chờ kết nối hoàn tất
      setConnected(true); // Cập nhật trạng thái đã kết nối

      // Đăng ký nhận tin nhắn từ server
      const subscription = subscribeToTopic(topic, (message) => {
        if (message?.type) {
          setMsg(message)
        };
      });

      return subscription; // Trả về subscription để cleanup
    };

    let subscriptionRef: StompSubscription;
    connect().then((sub) => (subscriptionRef = sub as StompSubscription));

    return () => {
      subscriptionRef?.unsubscribe(); // Hủy đăng ký khi component unmount
      disconnectStomp();
    };
  }, [topic]);

  return { msg, connected };
};


