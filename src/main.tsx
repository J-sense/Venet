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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <BookingSocketProvider>
            <SessionSocketProvider>
              <App />
              <Toaster richColors position="top-left" />
            </SessionSocketProvider>
          </BookingSocketProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
