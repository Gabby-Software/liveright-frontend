import {TrainerInvoiceType} from "../../types/invoice.type";
import {invoiceStatuses} from "../../enums/invoice-statuses";

export const invoices: TrainerInvoiceType[] = [
    {
        id: 1,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.ISSUED
    },
    {
        id: 2,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.ISSUED
    },
    {
        id: 3,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 4,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.OUTSTANDING
    },
    {
        id: 5,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.CANCELLED
    },
    {
        id: 6,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.OUTSTANDING
    },
    {
        id: 7,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 8,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 9,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 10,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 11,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 12,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 13,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
    {
        id: 14,
        client_name: 'Gershon Shufman',
        invoice_number: 'UV-109-880',
        session_type: 'PT Session',
        description: '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
        created_at: '2021-07-07',
        due_date: '2021-09-11',
        price: 120,
        currency: 'AED',
        status: invoiceStatuses.PAID
    },
];

export const clients: {id: number, first_name: string, last_name: string}[] = [
    {id: 1, first_name: 'Marina', last_name: 'Gergel'},
    {id: 2, first_name: 'Vaibrhav', last_name: 'Raj'},
    {id: 3, first_name: 'Harry', last_name: 'Potter'},
    {id: 4, first_name: 'Chupma', last_name: 'Champa'},
    {id: 5, first_name: 'Albert', last_name: 'Einstain'},
    {id: 6, first_name: 'Leah', last_name: 'Goldberg'},
];

export const statuses: {id: number, name: string}[] = [
    {id: 3, name: invoiceStatuses.ISSUED},
    {id: 1, name: invoiceStatuses.PAID},
    {id: 2, name: invoiceStatuses.OUTSTANDING},
    {id: 4, name: invoiceStatuses.CANCELLED},
];
