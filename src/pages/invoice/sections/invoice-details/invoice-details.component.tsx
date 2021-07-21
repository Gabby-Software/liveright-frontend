import React, {useState, useEffect} from 'react';
import Styles from './invoice-details.styles';
import {OptionType} from "../../../../types/option.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";

const InvoiceDetails = () => {
    const {t} = useTranslation();
    return (
        <Styles className={'invoice-details'}>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>{t('invoices:issued-on')}:</div>
                <div className={'invoice-details__value'}>22-05-2021</div>
            </div>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>{t('invoices:invoice-due')}:</div>
                <div className={'invoice-details__value invoice-details__value__error'}>22-05-2021</div>
            </div>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>{t('invoices:currency')}</div>
                <div className={'invoice-details__value'}>USD</div>
            </div>
        </Styles>
    )
};

export default InvoiceDetails;
