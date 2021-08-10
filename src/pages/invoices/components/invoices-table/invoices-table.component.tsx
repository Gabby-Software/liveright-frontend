import React, {useState, useEffect, useRef} from 'react';
import Styles from './invoices-table.styles';
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import DataTable from "../../../../components/data-table/data-table.component";
import {invoices} from "../../invoices.data";
import {date} from "../../../../pipes/date.pipe";
import {ReactComponent as InvoiceIcon} from "../../../../assets/media/icons/invoice.svg";
import {ReactComponent as PDFIcon} from "../../../../assets/media/icons/pdf.svg";
import {ReactComponent as ReceiptIcon} from "../../../../assets/media/icons/receipt.svg";
import {invoiceStatuses} from "../../../../enums/invoice-statuses";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {Link} from "react-router-dom";
import {payments} from "../../../../pipes/payments.pipe";
import {Routes} from "../../../../enums/routes.enum";
import fileManager from "../../../../managers/file.manager";
import TablePagination from "../../../../components/table-pagination/table-pagination.component";
import logger from "../../../../managers/logger.manager";
import {capitalize} from "../../../../pipes/capitalize.pipe";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers";
import {ACTION_GET_INVOICES_REQUEST} from "../../../../store/action-types";
import {InvoiceType} from "../../../../types/invoice.type";

const InvoicesTable = () => {
    const {type} = useAuth();
    const head = useRef<HTMLDivElement>(null);
    const {t} = useTranslation();
    const {current:{meta, data}, filters} = useSelector((state: RootState) => state.invoices);
    const dispatch = useDispatch();
    const updatePage = (p: number) => {
        dispatch({
            type: ACTION_GET_INVOICES_REQUEST, payload: {
                page: p,
                include: type===userTypes.CLIENT ? 'invoiceFrom' : 'invoiceTo',
                filters,
                onSuccess: () => {
                    if (!head.current) return;
                    window.scrollTo({
                        top: window.scrollY + head.current.getBoundingClientRect().top,
                        behavior: 'smooth'
                    });
                }
            }
        });
    };
    const labels = [
        'invoices:invoice-number',
        'invoices:invoice-date',
        type === userTypes.TRAINER ? 'invoices:client-name' : 'invoices:trainer-name',
        'invoices:price',
        'invoices:status',
        'invoices:options'
    ];
    const keys = [
        'invoice_number',
        'due_on',
        'name',
        'total',
        'status',
        'options'
    ];
    const invoiceUser = (t: InvoiceType) => type === userTypes.CLIENT ? t.invoice_from?.user : t.invoice_to?.user;
    return (
        <Styles ref={head}>
            <DataTable labels={labels} keys={keys} data={data} render={{
                invoice_number: (t) => `#${t.invoice_number}`,
                due_on: (t) => date(t.due_on),
                total: t => `${t.total} ${t.currency.code}`,
                name: t => `${invoiceUser(t)?.first_name} ${invoiceUser(t)?.last_name}`,
                status: t => <div
                    className={`invoice-table__status__${t.status?.toLowerCase()}`}>{capitalize(t.status)}</div>,
                options: ({status, id, url}) => (
                    <div className={'invoice-table__actions'}>
                        {[invoiceStatuses.OVERDUE, invoiceStatuses.DUE_SOON, invoiceStatuses.OUTSTANDING].includes(capitalize(status)) ? (
                            type === userTypes.CLIENT ? (
                                <a href={payments(Routes.INVOICES) + '/' + id}
                                   className={'invoice-table__link'}>
                                    <FormButton type={'primary'}>
                                        {t('invoices:settle-now')}
                                    </FormButton>
                                </a>
                            ) : (
                                <span className={'invoice-table__link'}>
                                <FormButton type={'primary'}>
                                    {t('invoices:remind-client')}
                                </FormButton>
                                </span>
                            )
                        ) : [invoiceStatuses.PAID].includes(capitalize(status)) ?
                            <InvoiceIcon className={'invoice-table__action'}
                                         onClick={() => fileManager.downloadUrl(url)}/> : null}
                        <PDFIcon className={'invoice-table__action'} onClick={() => fileManager.downloadUrl(url)}/>
                        <Link to={Routes.INVOICES + '/' + id} className={'invoice-table__action'}>
                            <ReceiptIcon/>
                        </Link>
                    </div>
                )
            }}/>
            <TablePagination page={meta.current_page} setPage={updatePage} total={meta.total}/>
        </Styles>
    )
};

export default InvoicesTable;
