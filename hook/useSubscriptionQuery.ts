import { db } from "@/firebase";
import axios from "axios";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const useSubscriptionQuery = () => {
  const sendNotification = async () => {
    try {
      const response = await axios.post("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);

      alert("알림 전송 성공!");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const prevSubscription = await registration.pushManager.getSubscription();

      if (prevSubscription) return alert("이미 알림 허용 상태 입니다.");

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      await axios.post("/api/subscribe", subscription);

      alert("알림 허용 성공!");
    } catch (error) {
      console.log("Subscription Error", error);
    }
  };

  const unsubscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const prevSubscription = await registration.pushManager.getSubscription();
      console.log(prevSubscription);

      if (prevSubscription) {
        prevSubscription.unsubscribe();
        const collectionRef = collection(db, "subscriptions");
        const q = query(
          collectionRef,
          where("endpoint", "==", prevSubscription.endpoint)
        );
        const snapshot = getDocs(q);

        (await snapshot).forEach((doc) => deleteDoc(doc.ref));

        alert("알림을 차단했습니다!");
      }
    } catch (error) {
      console.log("unsubscription Error", error);
    }
  };

  return {
    subscribeUser,
    unsubscribeUser,
    sendNotification,
  };
};

export default useSubscriptionQuery;
