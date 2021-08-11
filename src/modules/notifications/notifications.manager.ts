import {EP_GET_NOTIFICATIONS} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {NotificationType} from "../../types/notification.type";
import Pusher from 'pusher-js';
import cookieManager from "../../managers/cookie.manager";
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import logger from "../../managers/logger.manager";

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
    private static subscribeToPushNotifications() {
        logger.info('NOTIFICATION REGISTERRING PUSH NOTIFICATION')
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
            logger.info('NOTIFICATION SW READY')
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: process.env.REACT_APP_PUSHER_KEY||'',
                serviceWorkerRegistration: registration
            });
            beamsClient.getRegistrationState()
                .then(state => logger.info('NOTIFICATION PERMOSSION', state));
            beamsClient.start().then(() => {
                logger.info('NOTIFICATION BEAM START')
            })
        });
    }
    private static subscribeToInAppNotifications() {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY as string,{
            cluster: process.env.REACT_APP_PUSHER_CLUSTER as string,
            auth: {
                headers: {
                    Authorization: `Bearer ${cookieManager.get('access_token')}`,
                },
            },
        });
        // const channel = pusher.subscribe()
    }
    static async subscribe() {
        NotificationsManager.subscribeToPushNotifications();
        NotificationsManager.subscribeToInAppNotifications();
    }
}