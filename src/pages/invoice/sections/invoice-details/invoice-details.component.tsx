import React, {useState, useEffect} from 'react';
import Styles from './invoice-details.styles';
import {OptionType} from "../../../../types/option.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAPIData} from "../../../../hoc/api-get";
import {InvoiceFullType} from "../../../../types/invoice.type";
import {date} from "../../../../pipes/date.pipe";
import {classes} from "../../../../pipes/classes.pipe";
import moment from 'moment';

const InvoiceDetails = () => {
    const {t} = useTranslation();
    const {data} = useAPIData<InvoiceFullType>();
    return (
        <Styles className={'invoice-details'}>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>{t('invoices:issued-on')}:</div>
                <div className={'invoice-details__value'}>{date(data.created_at)}</div>
            </div>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>{t('invoices:invoice-due')}:</div>
                <div className={
                    classes('invoice-details__value',
                        moment(data.due_on).isBefore(moment())&&'invoice-details__value__error')}>
                    {date(data.due_on)}
                </div>
            </div>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>{t('invoices:currency')}</div>
                <div className={'invoice-details__value'}>{data.currency.name}</div>
            </div>
        </Styles>
    )
};

export default InvoiceDetails;
