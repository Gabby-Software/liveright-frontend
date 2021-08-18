import {
    EP_GET_NOTIFICATIONS,
    EP_PUSHER_BEAMS_AUTH,
    EP_PUSHER_CHANNEL_AUTH, EP_READ_ALL_NOTIFICATIONS, EP_READ_NOTIFICATION, EP_SETTINGS,
    EP_UNREAD_NOTIFICATIONS_COUNT
} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {NotificationType} from "../../types/notifications.type";
import Pusher from 'pusher-js';
import cookieManager from "../../managers/cookie.manager";
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import logger from "../../managers/logger.manager";
import {PushNotificationType} from "../../types/push-notification.type";
import store from '../../store/config.store';
import {ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS, ACTION_NEW_NOTIFICATION} from "../../store/action-types";
import {NotificationSubscriptionType} from "./types/notification-subscription.type";
import {NotificationSettingsType} from "./types/notification-settings.type";

export class NotificationsManager {
    static get(page: number = 1): Promise<PaginatedDataType<NotificationType>> {
        return api.get(EP_GET_NOTIFICATIONS + `?page=${page}`)
            .then(res => res.data)
    }

    static markAsRead(id: string) {
        return api.get(EP_READ_NOTIFICATION(id))
    }

    static markAllAsRead() {
        return api.get(EP_READ_ALL_NOTIFICATIONS)
    }

    static getUnreadCount(): Promise<number> {
        return api.get(EP_UNREAD_NOTIFICATIONS_COUNT)
            .then(res => res.data.data.total);
    }

    static getSettings(): Promise<number> {
        return api.get(EP_SETTINGS)
            .then(res => res.data.data)
            .then(res => res.notifications)
    }

    static updateSettings(notifications: NotificationSettingsType): Promise<void> {
        return api.patch(EP_SETTINGS, {notifications})
    }

    static resetSettings(): Promise<void> {
        return api.delete(EP_SETTINGS)
    }

    private subscriptions: NotificationSubscriptionType[] = [];
    public pusher: Pusher | null = null;
    private beamsClient: PusherPushNotifications.Client | null = null;

    public unsubscribeFromNotifications() {
        this.beamsClient?.stop()
            .then(() => logger.success('push notifications stopped'))
            .catch(e => logger.error('cannot unsubscribe from push notifications', e));
        this.pusher?.unbind_all();
    }

    private subscribeToPushNotifications(userID: string) {
        logger.info('BEAM NOTIFICATION REGISTERRING PUSH NOTIFICATION')
        Pusher.logToConsole = true;
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
            logger.info('BEAM NOTIFICATION SW READY')
            this.beamsClient = new PusherPushNotifications.Client({
                instanceId: process.env.REACT_APP_PUSHER_KEY || '',
                serviceWorkerRegistration: registration
            });
            const tokenProvider = new PusherPushNotifications.TokenProvider({
                url: EP_PUSHER_BEAMS_AUTH,
                headers: {
                    Authorization: `Bearer ${cookieManager.get('access_token')}`,
                }
            })
            const register = () => {
                this.beamsClient?.start()
                    .then(() => this.beamsClient?.setUserId(String(userID), tokenProvider))
                    .then(() => logger.info('BEAM User ID has been set', userID))
                    .catch(e => logger.error('Could not authenticate with Beams:', e))
            }
            this.beamsClient.getRegistrationState()
                .then(state => {
                    let states = PusherPushNotifications.RegistrationState;
                    logger.info('BEAM NOTIFICATION REGISTRATION STATE', state, states)
                    switch (state) {
                        case states.PERMISSION_DENIED: {
                            logger.info('BEAM STATE - DENIED')
                            // Notifications are blocked
                            // Show message saying user should unblock notifications in their browser
                            break;
                        }
                        case states.PERMISSION_GRANTED_REGISTERED_WITH_BEAMS:
                            logger.info('BEAM STATE', state);
                            this.beamsClient?.getUserId()
                                .then((id: string) => {
                                    if (id === userID) return;
                                    this.beamsClient?.stop()
                                        .then(() => {
                                            logger.success('push notifications stopped');
                                            register();
                                        })
                                        .catch(e => logger.error('cannot unsubscribe from push notifications', e));
                                })
                            break;
                        case states.PERMISSION_GRANTED_NOT_REGISTERED_WITH_BEAMS:
                        case states.PERMISSION_PROMPT_REQUIRED: {
                            logger.info('BEAM STATE', state);
                            register();
                            break;
                        }
                    }
                })
                .catch(e => logger.info('BEAM GET STATE ERROR', e))
        });
    }

    private uuid = '';
    public getBeamsData = () => {
        logger.info('Account UUID', this.uuid);
        this.beamsClient?.getUserId().then(userID => logger.info('Registered UUID', userID))
        this.beamsClient?.getRegistrationState()
            .then(state => logger.info('STATE', state))
        return this.beamsClient;
    }

    private subscribeToInAppNotifications(userId: string) {
        Pusher.logToConsole = true;
        this.pusher = new Pusher(process.env.REACT_APP_PUSHER_CHANNEL_KEY as string, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER as string,
            authEndpoint: EP_PUSHER_CHANNEL_AUTH,
            auth: {
                headers: {
                    Authorization: `Bearer ${cookieManager.get('access_token')}`,
                },
            },
        });
        this.pusher.unbind_all();
        const channel = this.pusher.subscribe(`private-account.${userId}.notification`);
        channel.bind("pusher:subscription_error", (error: string) => logger.error('PUSHER SUBSCRIPTION ERROR', error));
        channel.bind('account.notification', (data: PushNotificationType) => {
            logger.info('IN APP NOTIFICATION RECEIVED', data, this.uuid, this.subscriptions);
            // if(data.notifiable.uuid !== this.uuid) return;
            this.subscriptions.forEach(({callback}) => callback());
        });
    }

    init(user_id: string) {
        this.uuid = user_id;
        this.subscribeToPushNotifications(user_id);
        this.subscribeToInAppNotifications(user_id);
    }

    subscribe(callback: () => void) {
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