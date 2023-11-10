import { getSubscriptions } from "@/repository/subscription";
import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webPush.setVapidDetails(
  "mailto:rachaenlee@gmail.com",
  publicVapidKey as string,
  privateVapidKey as string
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const subscriptions = await getDocs(collection(db, "subscriptions"));
    const subscriptions = await getSubscriptions();
    console.log(subscriptions);
    const notificationPayload = {
      title: "Hello from PWA",
      body: "This is a test push notification",
      icon: "/images/icons/icon-192x192.png",
      badge: "/images/icons/icon-192x192.png",
    };

    try {
      console.log(subscriptions);
      for (const subscription of subscriptions) {
        await webPush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        );
      }
      res.status(200).json({ message: "Push notifications sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send push notifications" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
