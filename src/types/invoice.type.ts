import {CurrencyType} from "./currency.type";
import {AddressType} from "./address.type";

export type InvoiceItemType = {
    id: number;
    type: string;
    name: string;
    is_taxable: boolean;
    description: string;
    discount_amount: number;
    discount_percent: number;
    quantity: number;
    subtotal: number;
    tax_rate: number;
    tax_value: number;
    total: number;
    unit_price: number;
}
export type InvoiceAttendeeType = {
    id: number;
    type: string;
    uuid: string;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
    },
    address?: AddressType
}
export type InvoiceType = {
    id: number;
    created_at: string;
    currency: CurrencyType;
    discount_amount: number;
    discount_percent: number;
    due_on: string;
    invoice_number: string;
    is_taxable: boolean;
    status: string;
    subtotal: 8.5;
    tax_rate: 8.82;
    tax_value: 0.75;
    total: 8.92;
    type: string;
    invoice_to: InvoiceAttendeeType,
    invoice_from: InvoiceAttendeeType
}
export type InvoiceFullType = InvoiceType & {
    items: InvoiceItemType[]
};
type InvoiceTypeProt = {
    id?: number;
    invoice_number: string;
    session_type: string;
    description: string;
    created_at: string;
    due_date: string;
    price: number;
    currency: string;
    status: string;
    url: string;
    tax?: number;
    quantity?: number;
}
export type TrainerInvoiceType = InvoiceTypeProt & {
    client_name: string;
}
export type ClientInvoiceType = InvoiceTypeProt & {
    client_name: string;
}
