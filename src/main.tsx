import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/sonner.tsx";
import { BookingSocketProvider } from "./providers/BookingSocketProvider.tsx";
import { SessionSocketProvider } from "./providers/SessionSocketProvider.tsx";
import { NotificationSocketProvider } from "./providers/NotificationSocketProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log("Service Worker", registration.scope);
    } catch (error) {
      console.error("Service Worker:", error);
    }
  }
};

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    registerServiceWorker();
  });
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <BookingSocketProvider>
              <SessionSocketProvider>
                <NotificationSocketProvider>
                  <App />
                  <Toaster richColors position="top-left" />
                </NotificationSocketProvider>
              </SessionSocketProvider>
            </BookingSocketProvider>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
