import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile-head.styles';
import {classes} from "../../../../pipes/classes.pipe";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {ReactComponent as PrintIcon} from "../../../../assets/media/icons/print.svg";
import {ReactComponent as DownloadIcon} from "../../../../assets/media/icons/download.svg";
import {ReactComponent as MessagesIcon} from "../../../../assets/media/icons/messages.svg";
import {Link} from "react-router-dom";
import {Routes} from "../../../../enums/routes.enum";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";

type Props = {};
const InvoiceMobileHead = ({}: Props) => {
    const {t} = useTranslation();
    return (
        <Styles>
            <div className={'invoice-m-head__left'}>
                <h2 className={'invoice-m-head__price'}>{'902 USD'}</h2>
                <div className={'invoice-m-head__data'}>
                    <div className={'invoice-m-head__label'}>{t('invoices:issued-on')}:</div>
                    <div className={'invoice-m-head__value'}>22-05-2021</div>
                </div>
                <div className={'invoice-m-head__data'}>
                    <div className={'invoice-m-head__label'}>{t('invoices:due-date')}:</div>
                    <div className={classes('invoice-m-head__value', 'invoice-m-head__value__error')}>22-05-2021</div>
                </div>
            </div>
            <div className={'invoice-m-head__right'}>
                <FormButton type={'primary'} className={'invoice-m-head__status'}>{'Overdue'}</FormButton>
                <FormButton type={'primary'} className={'invoice-m-head__cta'}>{t('invoices:pay')}</FormButton>
                <div className={'invoice-m-head__icons'}>
                    <PrintIcon className={'invoice-m-head__action'} onClick={window.print}/>
                    <DownloadIcon className={'invoice-m-head__action'}/>
                    <Link to={Routes.CHAT}><MessagesIcon className={'invoice-m-head__action'}/></Link>
                </div>
            </div>
        </Styles>
    );
};

export default InvoiceMobileHead;
