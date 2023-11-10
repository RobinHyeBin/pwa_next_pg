import { NotificationContextProvider } from "@/context/Notification";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/sw.js");
        console.log("서비스 워커 등록 성공!");
      } catch (error) {
        console.error("서비스 워커 등록 실패", error);
      }
    }
  };

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <NotificationContextProvider>
      <Component {...pageProps} />
    </NotificationContextProvider>
  );
}
