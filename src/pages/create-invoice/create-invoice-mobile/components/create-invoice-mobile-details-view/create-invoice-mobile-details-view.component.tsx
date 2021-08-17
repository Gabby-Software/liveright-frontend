import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-mobile-details-view.styles';
import {useInvoiceForm} from "../../../create-invoice.context";
import {date} from "../../../../../pipes/date.pipe";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {createInvoiceSteps} from "../../../create-invoice.data";

const CreateInvoiceMobileDetailsView = () => {
    const {values, setStep} = useInvoiceForm();
    const {t} = useTranslation();
    return (
        <Styles onClick={() => setStep(createInvoiceSteps.DETAILS)}>
            <div className={'ci-preview__details'}>
                <span>issued</span>
                <span className={'ci-preview__details__value'}>{date(values.invoice.issuance_date)}</span>
            </div>
            <div className={'ci-preview__details'}>
                <span>due</span>
                <span className={'ci-preview__details__value'}>{date(values.invoice.due_on)}</span>
            </div>
            <div className={'ci-preview__details'}>
                <span>pay by</span>
                <span className={'ci-preview__details__value'}>{t(`invoices:${values.invoice.payment_method}`)}</span>
            </div>
        </Styles>
    );
};

export default CreateInvoiceMobileDetailsView;
