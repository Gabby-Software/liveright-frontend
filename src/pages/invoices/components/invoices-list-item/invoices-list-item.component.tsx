import React, {useState, useEffect, useMemo} from 'react';
import Styles from './invoices-list-item.styles';
import {InvoiceType, TrainerInvoiceType} from "../../../../types/invoice.type";
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
import userTypes from "../../../../enums/user-types.enum";
import PopOnScroll from "../../../../components/pop-on-scroll/pop-on-scroll.component";
import {capitalize} from "../../../../pipes/capitalize.pipe";

const InvoicesListItem = ({id, due_on, invoice_to, invoice_from, status, currency, total}: InvoiceType) => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const user = useMemo(() => {
        return type === userTypes.CLIENT ? invoice_from?.user : invoice_to?.user
    }, [type, invoice_to, invoice_from]);
    return (
        <PopOnScroll offset={100}>
            <Styles className={'invoice-li'} to={Routes.INVOICES + '/' + id}>
                <div className={'invoice-li__head'}>
                    <div className={'invoice-li__id'}>#{id}</div>
                    <div className={'invoice-li__date'}>{moment(due_on).format('YYYY-MM-DD')}</div>
                </div>
                <div className={'invoice-li__hr'}/>
                <div
                    className={'invoice-li__label'}>{type === userTypes.CLIENT ? t('invoices:issued-by') : t('invoices:issued-to')}</div>
                <div className={'invoice-li__body'}>
                    <img src={profilePlaceholder} className={'invoice-li__img'}/>
                    <div className={'invoice-li__name'}>{user?.first_name} {user?.last_name}</div>
                    <div className={'invoice-li__price'}>{total} {currency.code}</div>
                </div>
                <div className={'invoice-li__actions'}>
                    <div
                        className={classes('invoice-li__status', `invoice-li__status__${status.toLowerCase()}`)}>{capitalize(status)}</div>
                    {
                        [invoiceStatuses.OUTSTANDING, invoiceStatuses.DUE_SOON, invoiceStatuses.OVERDUE].includes(status) ? (
                            type === userTypes.CLIENT ? (
                                <a href={payments(Routes.INVOICES + '/' + id)} className={'invoice-li__cta'}
                                   onClick={e => e.stopPropagation()}
                                >{t('invoices:settle-now')}</a>
                            ) : (
                                <a className={'invoice-li__cta'}
                                   onClick={e => e.stopPropagation()}
                                >{t('invoices:remind-client')}</a>
                            )
                        ) : null
                    }
                </div>
            </Styles>
        </PopOnScroll>
    )
};

export default InvoicesListItem;
