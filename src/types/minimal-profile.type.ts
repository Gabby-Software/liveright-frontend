import {FileType} from "./file.type";

export type MinimalProfileType = {
    first_name: string;
    last_name: string;
    avatar: FileType|null
}
