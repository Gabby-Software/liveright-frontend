import {EP_GET_NOTIFICATIONS} from "../enums/api.enum";
import api from "./api.manager";
import {PaginatedDataType} from "../types/paginated-data.type";
import {NotificationType} from "../types/notification.type";
import Pusher from 'pusher-js';
import cookieManager from "./cookie.manager";

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
    static async subscribe() {
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
}