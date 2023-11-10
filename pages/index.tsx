import useSubscriptionQuery from "@/hook/useSubscriptionQuery";
import React from "react";

export default function Home() {
  const { subscribeUser, unsubscribeUser, sendNotification } =
    useSubscriptionQuery();

  const handleSubscribeClick = () => {
    subscribeUser();
  };

  const handleUnsubscribeClick = () => {
    unsubscribeUser();
  };

  const handleSendNotificationClick = () => {
    sendNotification();
  };

  return (
    <div>
      <h1>Welcome to your PWA</h1>
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={handleSubscribeClick}>알림 허용</button>
        <button onClick={handleUnsubscribeClick}>알림 차단</button>
        <button onClick={handleSendNotificationClick}>알림 푸쉬</button>
      </div>
    </div>
  );
}
