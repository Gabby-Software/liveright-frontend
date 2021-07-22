import {AccessOptionType} from "./access-option.type";
import {ProfileDataType} from "./profile-data.type";
import {CountryType} from "./country.type";
import {FileType} from "./file.type";
import {AddressType} from "./address.type";
export type AccountType = {
    account_level: null | number;
    is_active: boolean;
    is_current: boolean;
    last_used_at: null | string;
    type: AccessOptionType;
    uuid: string;
    profile: null | ProfileDataType;
    addresses: AddressType[];
}
export type AccountObjType = {
    accounts: AccountType[];
    avatar: FileType | null;
    // avatar_thumb: null | string;
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

