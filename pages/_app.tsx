import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("서비스 워커 등록 성공!", registration);

        const subscribeOptions: PushSubscriptionOptionsInit = {
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        };

        return registration.pushManager.subscribe(subscribeOptions);
      } catch (error) {
        console.error("서비스 워커 등록 실패", error);
      }
    }
  };

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return <Component {...pageProps} />;
}
