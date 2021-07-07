import React, {useState, useEffect} from 'react';
import Styles from './invoice-view.styles';
import {TrainerInvoiceType} from "../../../types/invoice.type";
import {Skeleton} from "antd";
import {invoices} from "../../invoices/invoices.data";
import Card from "../../../components/card/card.style";
import {OptionType} from "../../../types/option.type";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import FormButton from "../../../components/forms/form-button/form-button.component";
import fileManager from "../../../managers/file.manager";

type Props = {id: number};
const InvoiceView = ({id}:Props) => {
    const [invoice, setInvoice] = useState<TrainerInvoiceType|null>(null);
    const {t} = useTranslation();
    useEffect(() => {
        setInvoice(invoices.find(({id:iid}) => id === iid) || null);
        window.scrollTo({top: 0, behavior:'smooth'})
    }, [id]);
    if(!invoice) return <Skeleton/>;
    const values: OptionType[] = [
        {label: 'invoices:status', value: invoice.status},
        {label: 'invoices:invoice-number', value: invoice.invoice_number},
        {label: 'invoices:invoice-date', value: invoice.created_at},
        {label: 'invoices:invoice-due', value: invoice.due_date},
    ];
    return (
        <Styles>
                <div className={'invoice__header'}>
                    <div className={'invoice__type'}>{invoice.session_type}</div>
                    <div className={'invoice__price'}>{invoice.price} {invoice.currency}</div>
                </div>
                <div className={'invoice__body'}>
                    {
                        values.map(({label, value}) => (
                            <div className={'invoice__item'}>
                                <div className={'invoice__item__name'}>{t(label)}</div>
                                <div className={'invoice__item__value'}>{value}</div>
                            </div>
                        ))
                    }
                </div>
                <div className={'invoice__desc'}>
                    <h3 className={'invoice__desc__title'}>{t('invoices:description')}</h3>
                    <p className={'invoice__desc__body'}>{invoice.description}</p>
                </div>
                <div className={'invoice__footer'}>
                    <FormButton type={'primary'}>{t('invoices:mark-paid')}</FormButton>
                    <FormButton type={'default'}>{t('invoices:cancel-invoice')}</FormButton>
                </div>
            <button id={'download'} style={{display:'none'}} onClick={() => fileManager.downloadUrl('http://www.africau.edu/images/default/sample.pdf', `invoice-${invoice.invoice_number}.pdf`)}/>
        </Styles>
    )
};

export default InvoiceView;
