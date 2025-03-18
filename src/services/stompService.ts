import { stompClient } from "./stompClient";

export const sendMessage = (
  recipient: string,
  message: any
) => {
  if (stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat/private/' + recipient,
      body: JSON.stringify(message)
    })
    console.log(recipient)
    console.log(message)
  }
}


//

export const subscribeToTopic = (topic: string, callback: (message: any) => void) => {
  if (stompClient.connected) {
    return stompClient.subscribe(topic, (message) => {
      callback(JSON.parse(message.body));
    });
  }
};