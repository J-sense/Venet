importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA-6YgzV4mjvjXhffrGnAtg93RU8w0zCJA",
  authDomain: "jonkarmau.firebaseapp.com",
  projectId: "jonkarmau",
  storageBucket: "jonkarmau.firebasestorage.app",
  messagingSenderId: "259765508616",
  appId: "1:259765508616:web:f72f10390cbb457aba4fbd",
  measurementId: "G-YYTG5BZ2DF"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || '/VNetLogo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
