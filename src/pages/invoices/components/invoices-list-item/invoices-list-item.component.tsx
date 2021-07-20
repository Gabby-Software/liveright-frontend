import React, {useState, useEffect} from 'react';
import Styles from './invoices-list-item.styles';
import {TrainerInvoiceType} from "../../../../types/invoice.type";
import profilePlaceholder from '../../../../assets/media/profile-placeholder.png';
import moment from 'moment';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import {classes} from "../../../../pipes/classes.pipe";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {Link} from "react-router-dom";
import {payments} from "../../../../pipes/payments.pipe";
import {Routes} from "../../../../enums/routes.enum";
import {invoiceStatuses} from "../../../../enums/invoice-statuses";

const InvoicesListItem = ({id, due_date, client_name, status, currency, price}:TrainerInvoiceType) => {
    const {t} = useTranslation();
    const {type} = useAuth();
    return (
        <Styles className={'invoice-li'} to={Routes.INVOICES+'/'+id}>
            <div className={'invoice-li__head'} >
                <div className={'invoice-li__id'}>#{id}</div>
                <div className={'invoice-li__date'}>{moment(due_date).format('YYYY-MM-DD')}</div>
            </div>
            <div className={'invoice-li__hr'}/>
            <div className={'invoice-li__label'}>{t('invoices:issued-by')}</div>
            <div className={'invoice-li__body'}>
                <img src={profilePlaceholder} className={'invoice-li__img'}/>
                <div className={'invoice-li__name'}>{client_name}</div>
                <div className={'invoice-li__price'}>{price} {currency}</div>
            </div>
            <div className={'invoice-li__actions'}>
                <div className={classes('invoice-li__status', `invoice-li__status__${status.toLowerCase()}`)}>{status}</div>
                {
                    [invoiceStatuses.OUTSTANDING, invoiceStatuses.DUE_SOON, invoiceStatuses.OVERDUE].includes(status)?(
                        <a href={payments(Routes.INVOICES+'/'+id)} className={'invoice-li__cta'}
                           onClick={e => e.stopPropagation()}
                        >{t('invoices:settle-now')}</a>
                    ):null
                }
            </div>
        </Styles>
    )
};

export default InvoicesListItem;
