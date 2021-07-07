import React, {useState, useEffect} from 'react';
import Styles from './invoices.styles';
import DataTable from "../../components/data-table/data-table.component";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {invoices} from "./invoices.data";
import {TrainerInvoiceType} from "../../types/invoice.type";
import Invoice from "../invoice/invoice.component";
import DataPagination from "../../components/data-pagination/data-pagination.component";
import {PaginationMetaType} from "../../types/pagination-meta.type";
import InvoiceView from "../invoice/invoice-view/invoice-view.component";
import Card from "../../components/card/card.style";
import logger from "../../managers/logger.manager";

const Invoices = () => {
    const [invoice, setInvoice] = useState<number | null>(null);
    const [pagMeta, setPagMeta] = useState<PaginationMetaType>({current_page: 1, per_page: 10, total: invoices.length});
    const labels = [
        'invoices:client-name',
        'invoices:invoice-number',
        'invoices:price',
        'invoices:status'
    ];
    const keys = [
        'client_name',
        'invoice_number',
        'price',
        'status'
    ];
    logger.info('PAG META', pagMeta, pagMeta.current_page, invoices, (pagMeta.current_page-1)*pagMeta.per_page, invoices.slice((pagMeta.current_page-1)*pagMeta.per_page));
    return (
        <Styles>
            <div className={'invoices__data'}>
                <DataTable labels={labels} data={invoices.slice((pagMeta.current_page-1)*pagMeta.per_page,(pagMeta.current_page-1)*pagMeta.per_page+pagMeta.per_page)}
                           keys={keys} onClick={({id}) => setInvoice(id)} active={invoice||undefined}/>
                <DataPagination page={pagMeta.current_page} setPage={(page) => {
                    setPagMeta({...pagMeta, current_page: page})
                }} total={pagMeta.total}/>
            </div>
            {
                invoice ? (
                    <Card className={'invoices__view'}>
                        <InvoiceView id={invoice}/>
                    </Card>
                ) : null
            }
        </Styles>
    )
};

export default Invoices;
