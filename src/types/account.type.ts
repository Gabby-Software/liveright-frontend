import {AccessOptionType} from "./access-option.type";

export type AccountType = {
    account_level: null | number;
    is_active: boolean;
    is_current: boolean;
    last_used_at: null | string;
    type: AccessOptionType;
    uuid: string;
}
export type AccountObjType = {
    accounts: AccountType[];
    avatar: null | string;
    avatar_thumb: null | string;
    birthday: null | string;
    created_at: string;
    email: string;
    email_verified_at: null | string;
    first_name: string;
    gender: null | string;
    is_active: boolean;
    last_name: string;
    uuid: string;
}