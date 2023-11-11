import NotificationContext from "@/context/Notification";
import useSubscriptionQuery from "@/hook/useSubscriptionQuery";
import React, { useContext, useEffect, useState } from "react";

export default function Home() {
  const [permission, setPermission] = useState("default");
  const { isSubscribed, isDenied, isRendering, toggleSubscribe } =
    useContext(NotificationContext);
  const { subscribeUser, unsubscribeUser, sendNotification } =
    useSubscriptionQuery();

  const handleToggleSubscribe = async () => {
    isSubscribed ? await unsubscribeUser() : await subscribeUser();
    toggleSubscribe();
  };

  const handleSendNotificationClick = () => {
    sendNotification();
  };

  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  return (
    <div>
      <h1>What&apos;s your PWA?</h1>
      {isDenied && <h4>알림 권한 허용해주세요.</h4>}
      {!isRendering && (
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handleToggleSubscribe}>
            {isSubscribed ? "알림 차단" : "알림 허용"}
          </button>
          <button onClick={handleSendNotificationClick}>알림 푸쉬</button>
        </div>
      )}
      <p>{permission}</p>
    </div>
  );
}
