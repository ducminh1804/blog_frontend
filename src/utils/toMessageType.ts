import type { MessageType, msgType } from "../types/message.type"

export const toMessageType = (msg: msgType, chanel: string): MessageType => {
  return {
    id: crypto.randomUUID(), // Tạo ID tạm thời nếu cần
    senderId: msg.senderId,  // Điều chỉnh theo thuộc tính của msg
    recipentId: chanel,      // Giả định chanel chính là ID người nhận
    content: msg.content,    // Nội dung tin nhắn
    createAt: new Date().toISOString() // Thời gian hiện tại
  }
}