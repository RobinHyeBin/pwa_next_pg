import { errorMessage } from "@/constant/error";
import NotificationContext from "@/context/Notification";
import useSubscriptionQuery from "@/hook/useSubscriptionQuery";
import React, { useContext } from "react";

export default function Home() {
  const { isSubscribed, isRendering, toggleSubscribe } =
    useContext(NotificationContext);
  const { subscribeUser, unsubscribeUser, sendNotification } =
    useSubscriptionQuery();

  const handleToggleSubscribe = async () => {
    try {
      isSubscribed ? await unsubscribeUser() : await subscribeUser();
      toggleSubscribe();
    } catch (error: any) {
      if (error.message === errorMessage.PERMISSION_DENIED_ERROR_MESSAGE) {
        alert("알림 권한 허용해주세요.");
      }
    }
  };

  const handleSendNotificationClick = () => {
    sendNotification();
  };

  return (
    <div>
      <h1>What&apos;s your PWA?</h1>
      {!isRendering && (
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handleToggleSubscribe}>
            {isSubscribed ? "알림 차단" : "알림 허용"}
          </button>
          <button onClick={handleSendNotificationClick}>알림 푸쉬</button>
        </div>
      )}
    </div>
  );
}
