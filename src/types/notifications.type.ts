import {DatabaseItemType} from "./database-item.type";

export type NotificationType = {
    message: string;
    target: number;
    read_at: string|null;
    created_at: string
    data: {
        message: string,
        invoice_id?: number,
        session_id?: number
    }
    id: string;
    type: string;

}
export type NotificationsType = DatabaseItemType & {
    account_id: number;
    previous_vol: number;
    notifications: NotificationType[];
}
