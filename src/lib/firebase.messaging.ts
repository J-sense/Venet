import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  type MessagePayload,
  type Messaging,
} from "firebase/messaging";

import firebaseApp from "./firebase.app";

export const getFirebaseMessaging =
  async (): Promise<Messaging | null> => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const supported = await isSupported();

      if (!supported) {
        console.warn("Firebase Messaging is not supported.");
        return null;
      }

      return getMessaging(firebaseApp);
    } catch (error) {
      console.error(
        "Failed to initialize Firebase Messaging:",
        error
      );

      return null;
    }
  };

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const messaging = await getFirebaseMessaging();

    if (!messaging) return null;

    if (!("Notification" in window)) {
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Notification permission denied.");
      return null;
    }

    const registration =
      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    const vapidKey =
      import.meta.env.VITE_FIREBASE_VAPID_KEY;

    if (!vapidKey) {
      console.warn("Firebase VAPID key is missing from environment variables (VITE_FIREBASE_VAPID_KEY).");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    return token || null;
  } catch (error) {
    console.error("Failed to get FCM token:", error);
    return null;
  }
};

export const listenForMessages = async (
  callback: (payload: MessagePayload) => void
) => {
  const messaging = await getFirebaseMessaging();

  if (!messaging) return null;

  return onMessage(messaging, callback);
};
