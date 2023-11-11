import useSubscriptionQuery from "@/hook/useSubscriptionQuery";
import React, { ReactNode, createContext, useEffect, useState } from "react";

type NotificationContextState = {
  isSubscribed: boolean;
  isDenied: boolean;
  isRendering: boolean;
  toggleSubscribe: () => void;
};

const NotificationContext = createContext<NotificationContextState>({
  isSubscribed: false,
  isDenied: false,
  isRendering: true,
  toggleSubscribe: () => {},
});

type NotificationContextProviderProps = {
  children: ReactNode;
};

export const NotificationContextProvider = ({
  children,
}: NotificationContextProviderProps) => {
  const [isRendering, setIsRendering] = useState(true);
  const [isDenied, setIsDenied] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { getSubscriptionByEndpoint } = useSubscriptionQuery();

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const initSubscription = async () => {
    if (Notification.permission === "denied") {
      setIsDenied(true);
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    const { size: subscriptionCount } = await getSubscriptionByEndpoint(
      subscription?.endpoint
    );

    if (subscriptionCount > 0 || subscription) {
      setIsSubscribed(true);
    }

    setIsRendering(false);
  };

  useEffect(() => {
    initSubscription();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ isSubscribed, isDenied, isRendering, toggleSubscribe }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
