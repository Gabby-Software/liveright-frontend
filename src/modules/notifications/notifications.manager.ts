import {EP_GET_NOTIFICATIONS, EP_PUSHER_AUTH} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {NotificationType} from "../../types/notification.type";
import Pusher from 'pusher-js';
import cookieManager from "../../managers/cookie.manager";
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import logger from "../../managers/logger.manager";
import {PushNotificationType} from "../../types/push-notification.type";

export default class NotificationsManager {
    static get(page:number=1): Promise<PaginatedDataType<NotificationType>> {
        return api.get(EP_GET_NOTIFICATIONS+`?page=${page}`)
            .then(res => res.data)
    }
    static async markAsRead(id: number) {

    }
    static async markAllAsRead() {

    }
    static async getUnreadCount() {

    }
    private static subscribeToPushNotifications(userID: number) {
        logger.info('NOTIFICATION REGISTERRING PUSH NOTIFICATION')
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
            logger.info('NOTIFICATION SW READY')
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: process.env.REACT_APP_PUSHER_KEY||'',
                serviceWorkerRegistration: registration
            });
            beamsClient.getRegistrationState()
                .then(state => {
                    let states = PusherPushNotifications.RegistrationState;
                    switch (state) {
                        case states.PERMISSION_DENIED: {
                            // Notifications are blocked
                            // Show message saying user should unblock notifications in their browser
                            break;
                        }
                        case states.PERMISSION_GRANTED_REGISTERED_WITH_BEAMS: {
                            // Ready to receive notifications
                            // Show "Disable notifications" button, onclick calls '.stop'
                            break;
                        }
                        case states.PERMISSION_GRANTED_NOT_REGISTERED_WITH_BEAMS:
                        case states.PERMISSION_PROMPT_REQUIRED: {
                            beamsClient.start().then(() => {
                                logger.info('NOTIFICATION BEAM START')
                            });
                            break;
                        }
                    }
                });
        });
    }
    private static subscribeToInAppNotifications(userId: number) {
        Pusher.logToConsole = true;
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_CHANNEL_KEY as string,{
            cluster: process.env.REACT_APP_PUSHER_CLUSTER as string,
            authEndpoint: EP_PUSHER_AUTH,
            auth: {
                headers: {
                    Authorization: `Bearer ${cookieManager.get('access_token')}`,
                },
            },
        });
        const channel = pusher.subscribe(`private-user.${userId}.notification`);
        channel.bind("pusher:subscription_error", (error: string) => logger.error('PUSHER SUBSCRIPTION ERROR', error));
        channel.bind('user.notification', function(data:PushNotificationType) {
            logger.info('IN APP NOTIFICATION RECEIVED', data);
        });
    }
    static subscribe(user_id: number) {
        NotificationsManager.subscribeToPushNotifications(user_id);
        NotificationsManager.subscribeToInAppNotifications(user_id);
    }
}