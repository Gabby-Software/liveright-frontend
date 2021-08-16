import React, {useState, useEffect, useMemo, ComponentType, HTMLAttributes, SVGAttributes} from 'react';
import Styles, {ActionsStyles} from './financial-receivables-list-item.styles';
import {InvoiceType} from "../../../../../../types/invoice.type";
import {useTranslation} from "../../../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../../../hooks/auth.hook";
import userTypes from "../../../../../../enums/user-types.enum";
import PopOnScroll from "../../../../../../components/pop-on-scroll/pop-on-scroll.component";
import {Routes} from "../../../../../../enums/routes.enum";
import moment from "moment";
import profilePlaceholder from "../../../../../../assets/media/profile-placeholder.png";
import {classes} from "../../../../../../pipes/classes.pipe";
import {capitalize} from "../../../../../../pipes/capitalize.pipe";
import {invoiceStatuses} from "../../../../../../enums/invoice-statuses";
import {payments} from "../../../../../../pipes/payments.pipe";
import CardActions from "../../../../../../components/card-actions/card-actions.component";
import CardActionsItem from "../../../../../../components/card-actions-item/card-actions-item.component";
import {ReactComponent as DeleteIcon} from "../../../../../../assets/media/icons/trash.svg";
import {ReactComponent as SendIcon} from "../../../../../../assets/media/icons/send.svg";
import {ReactComponent as DownloadIcon} from "../../../../../../assets/media/icons/download.svg";
import {ReactComponent as ViewIcon} from "../../../../../../assets/media/icons/view.svg";
import {ReactComponent as ReceiptIcon} from "../../../../../../assets/media/icons/receipt.svg";
import ActionIcon from "../../../../../../components/action-icon/action-icon.component";
import {useDispatch} from "react-redux";
import {ACTION_CANCEL_INVOICE_REQUEST, ACTION_MARK_INVOICE_AS_PAID} from "../../../../../../store/action-types";
import {useInvoices} from "../../../../../invoices/invoices.context";
import logger from "../../../../../../managers/logger.manager";
import fileManager from "../../../../../../managers/file.manager";

const FinancialReceivablesListItem = ({id, invoice_number, due_on, invoice_to, invoice_from, status, currency, total, pdf}: InvoiceType) => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const dispatch = useDispatch();
    const {current:{meta}, filters} = useInvoices();
    const user = useMemo(() => {
        return type === userTypes.CLIENT ? invoice_from?.user : invoice_to?.user
    }, [type, invoice_to, invoice_from]);
    const markAsPaid = (id: number) => {
        dispatch({
            type: ACTION_MARK_INVOICE_AS_PAID,
            payload: {
                id,
                page: meta.current_page,
                filters,
                include: 'invoiceTo',
            }
        });
    }
    const cancel = () => {
        logger.info('cancelling...');
        dispatch({
            type: ACTION_CANCEL_INVOICE_REQUEST, payload: {
                id,
                page: meta.current_page,
                filters,
                include: 'invoiceTo'
            }
        })
    }
    const downloadPDF = () => {
        fileManager.downloadUrl(pdf?.url||'', `Invoice #${invoice_number}`)
    }
    const resend = () => {

    }
    const Actions = useMemo(() => () => {
        const actions: {href?: string, onClick?: () => void, Icon: ComponentType<SVGAttributes<{}>>, disabled?:boolean}[] = [
            {Icon: DeleteIcon, onClick: cancel, disabled: status === invoiceStatuses.PAID.toLowerCase()},
            {Icon: SendIcon, onClick: resend},
            {Icon: DownloadIcon, onClick: downloadPDF},
            {Icon: ViewIcon, href: Routes.INVOICES+`/${id}`},
        ]
        return (
            <ActionsStyles className={'invoice-li__extra-actions'}>
                {
                    actions.map(({Icon, ...attrs}) => <CardActionsItem {...attrs}><Icon/></CardActionsItem>)
                }
            </ActionsStyles>
        )
    }, [id]);
    return (
        <PopOnScroll offset={100}>
            <CardActions actions={<Actions/>}>
            <Styles className={'invoice-li'}
                    // to={Routes.INVOICES + '/' + id}
            >
                <div className={'invoice-li__head'}>
                    <div className={'invoice-li__id'}>#{id}</div>
                    <div className={'invoice-li__date'}>{moment(due_on).format('YYYY-MM-DD')}</div>
                </div>
                <div className={'invoice-li__hr'}/>
                <div
                    className={'invoice-li__label'}>{type === userTypes.CLIENT ? t('invoices:issued-by') : t('invoices:issued-to')}</div>
                <div className={'invoice-li__body'}>
                    <img alt={'user-image'} src={profilePlaceholder} className={'invoice-li__img'}/>
                    <div className={'invoice-li__name'}>{user?.first_name} {user?.last_name}</div>
                    <div className={'invoice-li__price'}>{total} {currency.code}</div>
                </div>
                <div className={'invoice-li__actions'}>
                    <div
                        className={classes('invoice-li__status', `invoice-li__status__${status.toLowerCase()}`)}>{capitalize(status)}</div>
                    {
                        [invoiceStatuses.OUTSTANDING, invoiceStatuses.DUE_SOON, invoiceStatuses.OVERDUE].includes(capitalize(status)) ? (
                                <a className={'invoice-li__cta'}
                                   onClick={() => markAsPaid(id)}
                                >{t('invoices:mark-paid')}</a>
                        ) : invoiceStatuses.PAID.toLowerCase() === status ? (
                            <ActionIcon icon={ReceiptIcon} onClick={() => {}}/>
                        ): null
                    }
                </div>
            </Styles>
            </CardActions>
        </PopOnScroll>
    )
};

export default FinancialReceivablesListItem;
