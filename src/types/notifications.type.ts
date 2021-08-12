import {DatabaseItemType} from "./database-item.type";

export type NotificationType = {
    timestamp:number;
    message: string;
    target: number;
    read_at: string|null;
}
export type NotificationsType = DatabaseItemType & {
    account_id: number;
    previous_vol: number;
    notifications: NotificationType[];
}
