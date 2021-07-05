import {FileType} from "./file.type";

export type TrainerType = {
    phone_number: string;
    address: string;
    about: string;
    qualifications: string;
    additional_information: string;
    tnb: FileType;
    avatar: string|null;
    avatar_thumb: string|null;
    birthday: string|null;
    created_at: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: string|null;
}
