import React, {useState, useEffect, useRef} from 'react';
import Styles from './financials-receivables-table.styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store/reducers";
import DataTable from "../../../../../../components/data-table/data-table.component";
import userTypes from "../../../../../../enums/user-types.enum";
import {date} from "../../../../../../pipes/date.pipe";
import {capitalize} from "../../../../../../pipes/capitalize.pipe";
import {invoiceStatuses} from "../../../../../../enums/invoice-statuses";
import {payments} from "../../../../../../pipes/payments.pipe";
import {Routes} from "../../../../../../enums/routes.enum";
import FormButton from "../../../../../../components/forms/form-button/form-button.component";
import {ReactComponent as InvoiceIcon} from "../../../../../../assets/media/icons/invoice.svg";
import {ReactComponent as ReceiptIcon} from "../../../../../../assets/media/icons/receipt.svg";
import {ReactComponent as PDFIcon} from "../../../../../../assets/media/icons/pdf.svg";
import {ReactComponent as TimesIcon} from "../../../../../../assets/media/icons/times-fill.svg";
import {ReactComponent as SendIcon} from "../../../../../../assets/media/icons/send.svg";

import fileManager from "../../../../../../managers/file.manager";
import {Link} from "react-router-dom";
import {useTranslation} from "../../../../../../modules/i18n/i18n.hook";
import TablePagination from "../../../../../../components/table-pagination/table-pagination.component";
import {
    ACTION_CANCEL_INVOICE_REQUEST,
    ACTION_GET_INVOICES_REQUEST,
    ACTION_MARK_INVOICE_AS_PAID
} from "../../../../../../store/action-types";
import {Popconfirm} from "antd";


type Props = {};
const FinancialsReceivablesTable = ({}: Props) => {
    const {data, meta} = useSelector((state: RootState) => state.invoices.current);
    const dispatch = useDispatch();
    const head = useRef<HTMLDivElement>(null);
    const {t} = useTranslation();
    const labels: string[] = [
        'invoices:invoice-number',
        'invoices:invoice-date',
        'invoices:client-name',
        'invoices:price',
        'invoices:due-date',
        'invoices:status',
        'invoices:options'
    ];
    const keys = [
        'invoice_number',
        'created_at',
        'name',
        'total',
        'due_on',
        'status',
        'options'
    ];
    const cancelInvoice = (id: number) => {
        dispatch({
            type: ACTION_CANCEL_INVOICE_REQUEST, payload: {
                id,
                page: meta.current_page,
                include: 'invoiceTo'
            }
        })
    }
    const updatePage = (p: number) => {
        dispatch({
            type: ACTION_GET_INVOICES_REQUEST, payload: {
                page: p,
                include: 'invoiceTo',
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
    const markAsPaid = (id: number) => {
        dispatch({
            type: ACTION_MARK_INVOICE_AS_PAID, payload: {
                id,
                page: meta.current_page,
                include: 'invoiceTo'
            }
        })
    }
    return (
        <Styles ref={head}>
            <DataTable labels={labels} data={data} keys={keys} render={{
                invoice_number: (t) => `#${t.invoice_number}`,
                created_at: (t) => date(t.created_at),
                due_on: (t) => date(t.due_on),
                total: t => `${t.total} ${t.currency.code}`,
                name: t => `${t.invoice_to?.user.first_name} ${t.invoice_to?.user.last_name}`,
                status: t => <div
                    className={`invoice-table__status__${t.status?.toLowerCase()}`}>{capitalize(t.status)}</div>,
                options: ({status, id, url}) => (
                    <div className={'invoice-table__actions'}>
                        {[invoiceStatuses.OVERDUE, invoiceStatuses.DUE_SOON, invoiceStatuses.OUTSTANDING].includes(capitalize(status)) ? (
                            <>
                                <span className={'invoice-table__link'}>
                                    <Popconfirm title={'Invoice will be marked as paid'}
                                                onConfirm={() => markAsPaid(id)}>
                                <FormButton type={'primary'}>
                                    {t('invoices:mark-paid')}
                                </FormButton>
                                    </Popconfirm>
                                </span>
                                <PDFIcon className={'invoice-table__action'}
                                         onClick={() => fileManager.downloadUrl(url)}/>
                                <SendIcon className={'invoice-table__action'}/>
                                <Popconfirm title={t('invoices:confirm-delete')}
                                            onConfirm={() => cancelInvoice(id)}>
                                    <TimesIcon className={'invoice-table__action'}/>
                                </Popconfirm>
                            </>
                        ) : [invoiceStatuses.PAID].includes(capitalize(status)) ?
                            <InvoiceIcon className={'invoice-table__action'}
                                         onClick={() => fileManager.downloadUrl(url)}/> : null}
                    </div>
                )
            }}/>
            <TablePagination page={meta.current_page} setPage={updatePage} total={meta.total}/>
        </Styles>
    );
};

export default FinancialsReceivablesTable;