/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.
// v1.0.0

import {clientsClaim} from 'workbox-core';
import {ExpirationPlugin} from 'workbox-expiration';
import {precacheAndRoute, createHandlerBoundToURL} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {notificationUrl} from "./modules/notifications/enums/notification-url.enum";

declare const self: ServiceWorkerGlobalScope;
declare const PusherPushNotifications: any;

clientsClaim();
importScripts("https://js.pusher.com/beams/service-worker.js");
// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);
const swv = '2.2.0';

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
    // Return false to exempt requests from being fulfilled by index.html.
    ({request, url}: { request: Request; url: URL }) => {
        // If this isn't a navigation, skip.
        if (request.mode !== 'navigate') {
            return false;
        }

        // If this is a URL that starts with /_, skip.
        if (url.pathname.startsWith('/_')) {
            return false;
        }

        // If this looks like a URL for a resource, because it contains
        // a file extension, skip.
        if (url.pathname.match(fileExtensionRegexp)) {
            return false;
        }

        // Return true to signal that we want to use the handler.
        return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({url}) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
    // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            // Ensure that once this runtime cache reaches a maximum size the
            // least-recently used images are removed.
            new ExpirationPlugin({maxEntries: 50}),
        ],
    })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        if (caches) {
            // Service worker cache should be cleared with caches.delete()
            caches.keys().then((names) => {
                for (const name of names) {
                    caches.delete(name);
                }
            });
        }
        self.skipWaiting();
    }
});

// Any other custom service worker logic can go here.
// self.addEventListener("push", function (e) {
//     console.log('NATIVE PUSH NOTIFICATION RECEIVED',e, e.data, {...e.data});
//     // @ts-ignore
//     if (!(self.Notification && self.Notification.permission === "granted")) {
//         //notifications aren't supported or permission not granted!
//         return;
//     }
//     if (e.data) {
//         let msg: NotificationOptions & { title?: string } = {};
//         try {
//             msg = e.data.json();
//         } catch (er) {
//             msg = {...e.data, icon: "/maskable_icon_x72.png"};
//         }
//         e.waitUntil(
//             self.registration.showNotification(msg.title || '', msg)
//         );
//     }
// });
self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    console.log('NATIVE PUSH NOTIFICATION CLICK', event.notification, event.notification.data.pusher);
    event.waitUntil(
        self.clients.openWindow(event.notification.data.pusher.customerPayload.data.url||'')
    );
});
PusherPushNotifications.onNotificationReceived = ({
                                                      payload,
                                                      pushEvent,
                                                      handleNotification,
                                                  }:any) => {
    payload.notification.title = "A new notification!";
    const data: {message:string,notification_type:string,data:{}} = JSON.parse(payload.notification.body);
    console.log('PUSH NOTIFICATION DATA', data);
    pushEvent.waitUntil(handleNotification({
        notification: {
            title: data.message,
            icon: '/maskable_icon_x96.png'
        },
        data: {
            url: (process.env.REACT_APP_BASE_URL||'') + notificationUrl(data.notification_type, data as {}).url
        }
    }));
};

console.log('SERVICE WORKER VERSION', swv)