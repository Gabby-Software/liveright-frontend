type InvoiceType = {
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
export type TrainerInvoiceType = InvoiceType & {
    client_name: string;
}
export type ClientInvoiceType = InvoiceType & {
    client_name: string;
}
