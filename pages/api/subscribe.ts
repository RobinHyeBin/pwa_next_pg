import { saveSubscription } from "@/repository/subscription";
import { NextApiRequest, NextApiResponse } from "next";
import { PushSubscription } from "web-push";

interface SubscribeApiRequest extends NextApiRequest {
  body: PushSubscription;
}

export default async function handler(
  req: SubscribeApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const subscription = req.body;

    try {
      saveSubscription(subscription);
      res.status(201).json({ message: "Subscription saved" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to save subscription" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
