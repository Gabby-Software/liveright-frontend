import {ActionLoggedType} from "./action-logged.type";
import {DatabaseItemType} from "./database-item.type";

export type UserLogsType = DatabaseItemType & {
    account_id: number;
    user_id: number;
    previous_vol: number;
    actions_logged: ActionLoggedType[];
};
