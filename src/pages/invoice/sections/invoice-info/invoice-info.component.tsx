import React, {useState, useEffect} from 'react';
import Styles from './invoice-info.styles';
import DataTable from "../../../../components/data-table/data-table.component";
import {ClientInvoiceType} from "../../../../types/invoice.type";
import {serviceTypes} from "../../../../enums/service-type.enum";
import moment from "moment";
import {invoiceStatuses} from "../../../../enums/invoice-statuses";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {asPrice} from "../../../../pipes/price.pipe";

const invoiceData: ClientInvoiceType[] = [
    {
        invoice_number: '',
        client_name: '',
        session_type: serviceTypes.CONSULTATION,
        description: 'Consultation for one',
        created_at: moment().add(-4, 'days').toISOString(),
        due_date: moment().add(-4, 'days').toISOString(),
        price: 451,
        currency: 'USD',
        status: invoiceStatuses.OVERDUE,
        url: '',
        tax: 10,
        quantity: 1
    },
    {
        invoice_number: '',
        client_name: '',
        session_type: serviceTypes.PT_SESSION,
        description: 'PT Training',
        created_at: moment().add(-4, 'days').toISOString(),
        due_date: moment().add(-4, 'days').toISOString(),
        price: 240,
        currency: 'USD',
        status: invoiceStatuses.OVERDUE,
        url: '',
        tax: 10,
        quantity: 2
    }
];
const InvoiceInfo = () => {
    const {t} = useTranslation();
    const labels = [
        'invoices:item', 'invoices:quantity', 'invoices:price', 'invoices:discount', 'invoices:vat', 'invoices:subtotal'
    ];
    const keys = ['item', 'qty', 'price', 'discount', 'vat', 'subtotal'];
    return (
        <Styles>
            <DataTable labels={labels} data={invoiceData} keys={keys} render={{
                item: ({session_type, description}) => (
                    <div className={'invoice-info__item'}>
                        <div className={'invoice-info__type'}>{t(`invoices:service-type.${session_type}`)}</div>
                        <div className={'invoice-info__desc'}>{description}</div>
                    </div>
                ),
                qty: ({quantity}) => `${quantity}X`,
                price: ({price, currency}) => `${price} ${currency}`,
                discount: () => 0,
                vat: ({tax, price, quantity, currency}) => `${asPrice(((price * quantity) / tax))} ${currency}`,
                subtotal: ({price, quantity, currency}) => `${price * quantity} ${currency}`
            }}>
                <tr className={'data-table__tr'}>
                    <td className={'data-table__td'} colSpan={4}>
                        <div className={'invoice-info__summary__left'}>
                            <div className={'invoice-info__s'}>
                                <div className={'invoice-info__s-key'}>{t('invoices:default-payment-method')}</div>
                                <div className={'invoice-info__s-value'}>{'Credit Card'}</div>
                            </div>
                            <div className={'invoice-info__s'}>
                                <div className={'invoice-info__s-key'}>{t('invoices:session-expiry')}</div>
                                <div className={'invoice-info__s-value'}>{t('invoices:never')}</div>
                            </div>
                        </div>
                    </td>
                    <td className={'data-table__td'}>
                        <div className={'invoice-info__d-key'}>{t('invoices:subtotal')}</div>
                        <div className={'invoice-info__d-key'}>{t('invoices:vat')} ({invoiceData[0].tax}%)</div>
                        <div className={'invoice-info__d-key'}>{t('invoices:discounts')}</div>
                    </td>
                    <td className={'data-table__td'}>
                        <div
                            className={'invoice-info__d-value'}>{asPrice(invoiceData.reduce((a, b) => a + b.price * (b.quantity || 0), 0))} {invoiceData[0].currency}</div>
                        <div
                            className={'invoice-info__d-value'}>{asPrice(invoiceData.reduce((a, b) => a + b.price * (b.quantity || 0) / (b.tax || 0), 0))} {invoiceData[0].currency}</div>
                        <div className={'invoice-info__d-value'}>0 {invoiceData[0].currency}</div>
                    </td>
                </tr>
            </DataTable>
            <p className={'invoice-info__thanks'}>{t('invoices:thanks')}</p>
        </Styles>
    )
};

export default InvoiceInfo;
