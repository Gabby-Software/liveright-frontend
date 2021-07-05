import {PaymentInfoType} from "./payment-info.type";
import {FileType} from "./file.type";

export type ProfileDataType = {
    phone_number: string;
    address:string;
    dietary_restrictions: string;
    injuries: string;
    notes:string;
    custom_url:string;
    about: string;
    qualifications: string;
    additional_information: string;
    payment_info: PaymentInfoType;
    tnb: FileType;
}
