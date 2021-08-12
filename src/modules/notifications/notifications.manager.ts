import {EP_GET_NOTIFICATIONS, EP_PUSHER_BEAMS_AUTH, EP_PUSHER_CHANNEL_AUTH} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {NotificationType} from "../../types/notification.type";
import Pusher from 'pusher-js';
import cookieManager from "../../managers/cookie.manager";
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import logger from "../../managers/logger.manager";
import {PushNotificationType} from "../../types/push-notification.type";
import store from '../../store/config.store';
import {ACTION_NEW_NOTIFICATION} from "../../store/action-types";
import {NotificationSubscriptionType} from "./types/notification-subscription.type";

export class NotificationsManager {
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
    private subscriptions: NotificationSubscriptionType[] = [];
    private subscribeToPushNotifications(userID: number) {
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
    private subscribeToInAppNotifications(userId: number) {
        Pusher.logToConsole = true;
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_CHANNEL_KEY as string,{
            cluster: process.env.REACT_APP_PUSHER_CLUSTER as string,
            authEndpoint: EP_PUSHER_CHANNEL_AUTH,
            auth: {
                headers: {
                    Authorization: `Bearer ${cookieManager.get('access_token')}`,
                },
            },
        });
        const channel = pusher.subscribe(`private-user.${userId}.notification`);
        channel.bind("pusher:subscription_error", (error: string) => logger.error('PUSHER SUBSCRIPTION ERROR', error));
        channel.bind('user.notification', (data:PushNotificationType) => {
            logger.info('IN APP NOTIFICATION RECEIVED', data);
            this.subscriptions.forEach(({callback}) => callback());
        });
    }
    init(user_id: number) {
        this.subscribeToPushNotifications(user_id);
        this.subscribeToInAppNotifications(user_id);
    }
    subscribe(callback: ()=>void) {
        const id = Math.random();
        this.subscriptions.push({id, callback});
        return id;
    }
    unsubscribe(subscription_id: number) {
        this.subscriptions = this.subscriptions.filter(({id}) => id !== subscription_id);
    }

}
const notificationManager = new NotificationsManager();
export default notificationManager;