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

const InvoicesTable = () => {
    const {type} = useAuth();
    const [page, setPage] = useState(1);
    const head = useRef<HTMLDivElement>(null);
    const {t} = useTranslation();
    const updatePage = (p: number) => {
        setPage(p);
        setTimeout(() => {
            if (!head.current) return;
            window.scrollTo({top: window.scrollY + head.current.getBoundingClientRect().top, behavior: 'smooth'});
        });
    };
    const labels = [
        type === userTypes.TRAINER ? 'invoices:client-name' : 'invoices:trainer-name',
        'invoices:invoice-date',
        'invoices:trainer-name',
        'invoices:price',
        'invoices:status',
        'invoices:options'
    ];
    const keys = [
        'invoice_number',
        'due_date',
        'client_name',
        'price',
        'status',
        'options'
    ];
    return (
        <Styles ref={head}>
            <DataTable labels={labels} keys={keys} data={invoices.slice((page - 1) * 10, page * 10)} render={{
                invoice_number: (t) => `#${t.invoice_number}`,
                due_date: (t) => date(t.due_date),
                price: t => `${t.price} ${t.currency}`,
                status: t => <div className={`invoice-table__status__${t.status?.toLowerCase()}`}>{t.status}</div>,
                options: ({status, id, url}) => (
                    <div className={'invoice-table__actions'}>
                        {[invoiceStatuses.OVERDUE, invoiceStatuses.DUE_SOON, invoiceStatuses.OUTSTANDING].includes(status) ? (
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
                        ) : [invoiceStatuses.PAID].includes(status) ? <InvoiceIcon className={'invoice-table__action'}
                                                                                   onClick={() => fileManager.downloadUrl(url)}/> : null}
                        <PDFIcon className={'invoice-table__action'} onClick={() => fileManager.downloadUrl(url)}/>
                        <Link to={Routes.INVOICES + '/' + id} className={'invoice-table__action'}>
                            <ReceiptIcon/>
                        </Link>
                    </div>
                )
            }}/>
            <TablePagination page={page} setPage={updatePage} total={invoices.length}/>
        </Styles>
    )
};

export default InvoicesTable;
