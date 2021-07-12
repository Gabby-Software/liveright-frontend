import {createContext} from "react";
import {InvoiceFormType} from "../../../types/invoice-form.type";
import {date} from "../../../pipes/date.pipe";

export type InvoiceContextType = {
    form: InvoiceFormType;
    step: number;
    setStep: (s: number) => void;
    onClose: ()=>void;
    update: (name:string,value:any) => void;
}
export const initialValues: InvoiceFormType = {
    due_date: date(new Date().toDateString()),
    service_type: 'PT Session',
    other: '',
    quantity: 1,
    session_expired: '',
    client_name: '',
    price: 0,
    discount: 0,
    description: ''
};
export const InvoiceContext = createContext<InvoiceContextType>({
    form: initialValues,
    step: 0,
    setStep: ()=>{},
    onClose: ()=>{},
    update: () =>{}
});
