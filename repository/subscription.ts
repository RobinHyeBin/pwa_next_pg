import { db } from "@/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

// const subscriptions = new Set<PushSubscription>();

export function saveSubscription(subscription: PushSubscription) {
  // subscriptions.add(subscription);
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
