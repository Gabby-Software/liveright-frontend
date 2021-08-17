import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile-summary.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAPIData} from "../../../../hoc/api-get";
import {InvoiceFullType} from "../../../../types/invoice.type";
import {
    invoiceDiscount,
    invoiceItemTax,
    invoiceItemTotal,
    invoiceTax,
    invoiceTotal
} from "../../../../pipes/invoice-total.pipe";
import {asPrice} from "../../../../pipes/price.pipe";
import {asMoney} from "../../../../pipes/as-money.pipe";

const InvoiceMobileSummary = () => {
    const {t} = useTranslation();
    const {data} = useAPIData<InvoiceFullType>();
    return (
        <Styles className={'invoice-m-summary'}>
            <div className={'invoice-m-summary__row'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{t('invoices:item')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{t('invoices:cost')}</div>
            </div>
            {
                data.items.map((item) => (
                    <>
                        <div className={'invoice-m-summary__row'}>
                            <div className={'invoice-m-summary__item invoice-m-summary__bold'}>
                                <div className={'invoice-m-summary__item invoice-m-summary__ebold'}>{item.type}</div>
                                <div className={'invoice-m-summary__item'}>{item.name}</div>
                            </div>
                            <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{asMoney(asPrice(invoiceItemTotal(item)))} {data.currency.code}</div>
                        </div>
                        <div className={'invoice-m-summary__row invoice-m-summary__row__space'}>
                            <div className={'invoice-m-summary__item'}>{item.quantity} X {item.unit_price*(1-item.discount_percent/100)} {data.currency.code}</div>
                            <div className={'invoice-m-summary__item'}>({asMoney(asPrice(invoiceItemTax(item)))} {data.currency.code} {t('invoices:vat')})</div>
                        </div>
                    </>
                ))
            }
            <div className={'invoice-m-summary__hr'}/>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>{t('invoices:subtotal')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{asMoney(asPrice(data.items.reduce((a,b) => a+b.unit_price*b.quantity, 0)))} {data.currency.code}</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>{t('invoices:discount')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{asMoney(asPrice(invoiceDiscount(data.items)))} {data.currency.code}</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>{t('invoices:vat')} ({data.tax_rate}%)</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{asMoney(asPrice(invoiceTax(data.items)))} {data.currency.code}</div>
            </div>
            <div className={'invoice-m-summary__hr'}/>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{t('invoices:total')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{asMoney(asPrice(invoiceTotal(data.items)))} {data.currency.code}</div>
            </div>
        </Styles>
    );
};

export default InvoiceMobileSummary;
