import { db } from "@/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { PushSubscription } from "web-push";

export function saveSubscription(subscription: PushSubscription) {
  addDoc(collection(db, "subscriptions"), subscription);
}

export async function getSubscriptions() {
  const subscriptions: PushSubscription[] = [];
  const querySnapshot = await getDocs(collection(db, "subscriptions"));

  querySnapshot.forEach((doc) =>
    subscriptions.push(doc.data() as PushSubscription)
  );

  return subscriptions;
}
