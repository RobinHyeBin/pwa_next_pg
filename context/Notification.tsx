import useSubscriptionQuery from "@/hook/useSubscriptionQuery";
import React, { ReactNode, createContext, useEffect, useState } from "react";

type NotificationContextState = {
  isSubscribed: boolean;
  isRendering: boolean;
  toggleSubscribe: () => void;
};

const NotificationContext = createContext<NotificationContextState>({
  isSubscribed: false,
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
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { getSubscriptionByEndpoint } = useSubscriptionQuery();

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const initSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    const { size: subscriptionCount } = await getSubscriptionByEndpoint(
      subscription?.endpoint
    );

    setIsSubscribed(!!subscriptionCount);
    setIsRendering(false);
  };

  useEffect(() => {
    initSubscription();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ isSubscribed, isRendering, toggleSubscribe }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
