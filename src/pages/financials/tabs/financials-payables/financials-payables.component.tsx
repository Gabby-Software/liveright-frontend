import React, {useState, useEffect} from 'react';
import Styles from './financials-payables.styles';
import Invoices from "../../../invoices/invoices.component";
import {Link} from 'react-router-dom';
import {Routes} from "../../../../enums/routes.enum";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import FormButton from "../../../../components/forms/form-button/form-button.component";

type Props = {};
const FinancialsPayables = ({}: Props) => {
    const {t} = useTranslation();
    return (
        <Styles>
            <Invoices/>
            <Link to={Routes.PAYMENT_METHODS} className={'invoices-cta'}>
                <FormButton type={'primary'}>{t('invoices:manage-payment-methods')}</FormButton>
            </Link>
        </Styles>
    )
};

export default FinancialsPayables;
