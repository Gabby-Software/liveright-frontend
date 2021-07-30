import React, {useState, useEffect} from 'react';
import Styles from './invoice-attendees.styles';
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {ReactComponent as PrintIcon} from "../../../../assets/media/icons/print.svg";
import {ReactComponent as DownloadIcon} from "../../../../assets/media/icons/download.svg";
import {ReactComponent as MessagesIcon} from "../../../../assets/media/icons/messages.svg";
import moment from 'moment';
import {Routes} from "../../../../enums/routes.enum";
import {Link} from "react-router-dom";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAPIData} from "../../../../hoc/api-get";
import {InvoiceFullType} from "../../../../types/invoice.type";
import {capitalize} from "../../../../pipes/capitalize.pipe";
import {addressLine} from "../../../../pipes/address-line.pipe";

const InvoiceAttendees = () => {
    const {t} = useTranslation();
    const {data} = useAPIData<InvoiceFullType>();
    return (
        <Styles>
            <div className={'invoice-att'}>
                <div className={'invoice-att__title'}>{t('invoices:issued-by')}</div>
                <div className={'invoice-att__name'}>{data.invoice_from.user.first_name} {data.invoice_from.user.last_name}</div>
                <div
                    className={'invoice-att__desc'}>{addressLine(data.invoice_from.address)}</div>
            </div>
            <div className={'invoice-att'}>
                <div className={'invoice-att__title'}>{t('invoices:issued-to')}</div>
                <div className={'invoice-att__name'}>{data.invoice_to.user.first_name} {data.invoice_to.user.last_name}</div>
                <div
                    className={'invoice-att__desc'}>{addressLine(data.invoice_to.address)}</div>
            </div>
            <div className={'invoice-att__actions'}>
                <FormButton type={'primary'} className={'invoice-att__status'}>{capitalize(data.status)}</FormButton>
                <FormButton type={'primary'} className={'invoice-att__cta'}>{t('invoices:pay')}</FormButton>
                <div className={'invoice-att__icons'}>
                    <PrintIcon className={'invoice-att__action'} onClick={window.print}/>
                    <DownloadIcon className={'invoice-att__action'}/>
                    <Link to={Routes.CHAT}><MessagesIcon className={'invoice-att__action'}/></Link>
                </div>
            </div>
            <div className={'invoice-att__print'}>
                <FormButton type={'primary'} className={'invoice-att__status'}>{capitalize(data.status)}</FormButton>
                <div className={'invoice-att__date'}><i>{`as of ${moment().format('DD-MM-YYYY')}`}</i></div>
            </div>
        </Styles>
    );
};

export default InvoiceAttendees;
