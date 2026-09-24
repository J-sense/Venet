self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push event received:', event);
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = { title: 'Notification', body: event.data ? event.data.text() : '' };
    }

    const title = data.title || data.notification?.title || 'Notification';
    const options = {
        body: data.body || data.notification?.body || 'You have a new update',
        icon: data.icon || data.notification?.icon || '/VNetLogo.png',
        badge: data.badge || '/VNetLogo.png',
        data: {
            url: data.data?.url || data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    // Resolve target URL relative to origin
    const targetUrl = new URL(event.notification.data?.url || '/', self.location.origin).href;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            // 1. If exact matching tab is open, focus it
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }

            // 2. If any tab of this app is open, focus and navigate it
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if ('focus' in client && 'navigate' in client) {
                    client.focus();
                    return client.navigate(targetUrl);
                }
            }

            // 3. Otherwise open a new tab
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});