import {DatabaseItemType} from "./database-item.type";
import {AccessOptionType} from "./access-option.type";

export type LibraryType = DatabaseItemType & {
    "account_id": number;
    "user_id": number;
    "created_by": number;
    "access": AccessOptionType;
    "is_template": boolean;
    "based_on_template": boolean;
    "original_template": number;
    "keep_synced": boolean;
    "name": string;
    "description": string;
}
