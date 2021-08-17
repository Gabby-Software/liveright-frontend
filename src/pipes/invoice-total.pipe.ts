import {asMoney} from "./as-money.pipe";
import {asPrice} from "./price.pipe";
import {InvoiceItemType} from "../types/invoice.type";

export const invoiceItemTotal = (item: InvoiceItemType) => {
    return +item.unit_price*item.quantity*(1-item.discount_percent/100)*(1+item.tax_rate/100);
}
export const invoiceItemTax = (item: InvoiceItemType) => {
    return +item.unit_price*item.quantity*(1-item.discount_percent/100)*item.tax_rate/100;
}
export const invoiceItemDiscount = (item: InvoiceItemType) => {
    return +item.unit_price*item.quantity*item.discount_percent/100;
}
export const invoiceTotal = (items: InvoiceItemType[]) => items.reduce((a,b) => a+invoiceItemTotal(b), 0);
export const invoiceTax = (items: InvoiceItemType[]) => items.reduce((a,b) => a+invoiceItemTax(b), 0);
export const invoiceDiscount = (items: InvoiceItemType[]) => items.reduce((a,b) => a+invoiceItemDiscount(b), 0);