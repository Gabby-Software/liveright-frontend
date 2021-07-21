import React, {useState, useEffect} from 'react';
import Styles from './invoice-card.styles';
import {TrainerInvoiceType} from "../../../../types/invoice.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {Link} from "react-router-dom";
import {payments} from "../../../../pipes/payments.pipe";
import {Routes} from "../../../../enums/routes.enum";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {classes} from "../../../../pipes/classes.pipe";
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";

const InvoiceCard = ({invoice_number, client_name, status, price, currency, id}:TrainerInvoiceType) => {
    const {t} = useTranslation();
    const {type} = useAuth();
    return (
        <Styles to={Routes.INVOICES+'/'+id}>
            <div className={'invoice-card__left'}>
                <h3 className={'invoice-card__number'}>{t('invoices:number', {number: id})}</h3>
                <p className={'invoice-card__issuer'}>{type === userTypes.CLIENT?t('invoices:from', {name: client_name}):t('invoices:to',{name:client_name})}</p>
                <h2 className={'invoice-card__price desktop'}>{price} {currency}</h2>
            </div>
            <div className={'invoice-card__right'}>
                <FormButton type={'primary'}
                            className={classes('invoice-card__status', status === 'Overdue'?'invoice-card__status__overdue':'invoice-card__status__due-soon')}
                >{status}</FormButton>
                <h2 className={'invoice-card__price mobile'}>{price} {currency}</h2>
                {
                    type === userTypes.CLIENT?(
                        <a href={payments(Routes.INVOICES+'/'+id)} onClick={e => e.stopPropagation()}>
                            <FormButton type={'ghost'} className={'invoice-card__action'}>{t('invoices:settle-now')}</FormButton>
                        </a>
                    ):(
                        <FormButton type={'ghost'} className={'invoice-card__action'}>{t('invoices:remind-client')}</FormButton>
                    )
                }
            </div>
        </Styles>
    );
};

export default InvoiceCard;
