import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile-head.styles';
import {classes} from "../../../../pipes/classes.pipe";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {ReactComponent as PrintIcon} from "../../../../assets/media/icons/print.svg";
import {ReactComponent as DownloadIcon} from "../../../../assets/media/icons/download.svg";
import {ReactComponent as MessagesIcon} from "../../../../assets/media/icons/messages.svg";
import {ReactComponent as MoreIcon} from "../../../../assets/media/icons/more.svg";
import {Link, useHistory} from "react-router-dom";
import {Routes} from "../../../../enums/routes.enum";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useAPIData} from "../../../../hoc/api-get";
import {InvoiceFullType} from "../../../../types/invoice.type";
import {date} from "../../../../pipes/date.pipe";
import {capitalize} from "../../../../pipes/capitalize.pipe";
import moment from 'moment';
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import SmallModal, {MenuItem} from "../../../../components/small-modal/small-modal.component";
import fileManager from "../../../../managers/file.manager";
import {useDispatch} from "react-redux";
import {ACTION_CANCEL_INVOICE_REQUEST} from "../../../../store/action-types";

type Props = {};
const InvoiceMobileHead = ({}: Props) => {
    const {t} = useTranslation();
    const {data} = useAPIData<InvoiceFullType>();
    const {type} = useAuth();
    const [actionsOpen, setActionsOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const cancel = () => {
        dispatch({
            type: ACTION_CANCEL_INVOICE_REQUEST,
            payload: {
                id: data.id,
                onSuccess: () => history.replace(type===userTypes.CLIENT?Routes.INVOICES:Routes.FINANCIALS_RECEIVABLES)
            },
        });
    }
    const downloadPdf = () => {
        fileManager.downloadUrl(data.pdf?.url||'', `Invoice #${data.invoice_number}.pdf`);
    }
    const moreMenu: MenuItem[] = [
        {
            name: t('invoices:delete'),
            onClick: cancel
        },
        {
            name: t('invoices:print'),
            onClick: window.print,
        },
        {
            name: t('invoices:download-pdf'),
            onClick: downloadPdf
        }
    ];
    return (
        <Styles>
            <div className={'invoice-m-head__left'}>
                <h2 className={'invoice-m-head__price'}>{'902 USD'}</h2>
                <div className={'invoice-m-head__data'}>
                    <div className={'invoice-m-head__label'}>{t('invoices:issued-on')}:</div>
                    <div className={'invoice-m-head__value'}>{date(data.created_at)}</div>
                </div>
                <div className={'invoice-m-head__data'}>
                    <div className={'invoice-m-head__label'}>{t('invoices:invoice-due')}:</div>
                    <div className={classes('invoice-m-head__value', moment(data.due_on).isBefore(moment())&&'invoice-m-head__value__error')}>{date(data.due_on)}</div>
                </div>
            </div>
            <div className={'invoice-m-head__right'}>
                <FormButton type={'primary'} className={'invoice-m-head__status'}>{capitalize(data.status)}</FormButton>
                {
                    type === userTypes.CLIENT ? (
                        <FormButton type={'primary'} className={'invoice-m-head__cta'}>{t('invoices:pay')}</FormButton>
                    ) : null
                }
                <div className={'invoice-m-head__icons'}>
                    {/*<PrintIcon className={'invoice-m-head__action'} onClick={window.print}/>*/}
                    <DownloadIcon className={'invoice-m-head__action'}/>
                    <Link to={Routes.CHAT}><MessagesIcon className={'invoice-m-head__action'}/></Link>
                    {
                        type === userTypes.CLIENT?null:(
                            <MoreIcon className={'invoice-m-head__action'} onClick={() => setActionsOpen(true)}/>
                        )
                    }
                </div>
            </div>
            <SmallModal menu={moreMenu} title={t('invoices:actions')} visible={actionsOpen} onCancel={() => setActionsOpen(false)}/>
        </Styles>
    );
};

export default InvoiceMobileHead;
