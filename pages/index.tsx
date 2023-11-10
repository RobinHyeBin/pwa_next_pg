import React from "react";

async function sendNotification() {
  try {
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

async function subscribeUser() {
  navigator.serviceWorker.ready.then((registration) => {
    registration.pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        console.log("Already subscribed");
      } else {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          })
          .then((subscription) => {
            // save subscription on DB
            fetch("/api/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(subscription),
            });
          });
      }
    });
  });
}

export default function Home() {
  const handleSubscribeClick = () => {
    subscribeUser();
  };

  const handleSendNotificationClick = () => {
    sendNotification();
  };

  return (
    <div>
      <h1>Welcome to your PWA</h1>
      <button onClick={handleSubscribeClick}>
        Subscribe for push notifications
      </button>
      <button onClick={handleSendNotificationClick}>Send notification</button>
    </div>
  );
}
