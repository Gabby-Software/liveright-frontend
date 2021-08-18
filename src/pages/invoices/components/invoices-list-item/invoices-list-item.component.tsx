import React, {useState, useEffect, useMemo, ComponentType, SVGAttributes} from 'react';
import Styles, {StyledAvatar} from './invoices-list-item.styles';
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
import CardActionsItem from "../../../../components/card-actions-item/card-actions-item.component";
import CardActions from "../../../../components/card-actions/card-actions.component";
import {ReactComponent as DeleteIcon} from "../../../../assets/media/icons/trash.svg";
import {ReactComponent as SendIcon} from "../../../../assets/media/icons/send.svg";
import {ReactComponent as DownloadIcon} from "../../../../assets/media/icons/download.svg";
import {ReactComponent as ViewIcon} from "../../../../assets/media/icons/view.svg";
import {ActionsStyles} from "../../../financials/tabs/financials-receivables/components/financial-receivables-list-item/financial-receivables-list-item.styles";
import fileManager from "../../../../managers/file.manager";
import {noImage} from "../../../../pipes/no-image.pipe";

const InvoicesListItem = ({id, due_on, invoice_to, invoice_from, status, currency, total, pdf, invoice_number}: InvoiceType) => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const user = useMemo(() => {
        return type === userTypes.CLIENT ? invoice_from?.user : invoice_to?.user
    }, [type, invoice_to, invoice_from]);
    const downloadPDF = () => {
        fileManager.downloadUrl(pdf?.url||'', `Invoice #${invoice_number}`)
    }
    const Actions = useMemo(() => () => {
        const actions: {href?: string, onClick?: () => void, Icon: ComponentType<SVGAttributes<{}>>, disabled?:boolean}[] = [
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
            <Styles className={'invoice-li'}>
                <div className={'invoice-li__head'}>
                    <div className={'invoice-li__id'}>#{id}</div>
                    <div className={'invoice-li__date'}>{moment(due_on).format('YYYY-MM-DD')}</div>
                </div>
                <div className={'invoice-li__hr'}/>
                <div
                    className={'invoice-li__label'}>{type === userTypes.CLIENT ? t('invoices:issued-by') : t('invoices:issued-to')}</div>
                <div className={'invoice-li__body'}>
                    <StyledAvatar url={user?.avatar?.url} placeholder={noImage(user?.first_name, user?.last_name)}/>
                    {/*<img src={profilePlaceholder} className={'invoice-li__img'}/>*/}
                    <div className={'invoice-li__name'}>{user?.first_name} {user?.last_name}</div>
                    <div className={'invoice-li__price'}>{total} {currency.code}</div>
                </div>
                <div className={'invoice-li__actions'}>
                    <div
                        className={classes('invoice-li__status', `invoice-li__status__${status.toLowerCase()}`)}>{capitalize(status)}</div>
                    {
                        [invoiceStatuses.OUTSTANDING, invoiceStatuses.DUE_SOON, invoiceStatuses.OVERDUE].includes(status) ? (
                                <a href={payments(Routes.INVOICES + '/' + id)} className={'invoice-li__cta'}
                                   onClick={e => e.stopPropagation()}
                                >{t('invoices:settle-now')}</a>
                        ) : null
                    }
                </div>
            </Styles>
            </CardActions>
        </PopOnScroll>
    )
};

export default InvoicesListItem;
