import {DatabaseItemType} from "./database-item.type";

export type NotificationType = {
    timestamp:number;
    message: string;
    target: number;
    seen: boolean;
    medium_delivered: {
        app: boolean;
        email: boolean;
    }
}
export type NotificationsType = DatabaseItemType & {
    account_id: number;
    previous_vol: number;
    notifications: NotificationType[];
}
