import React, {useState, useEffect, useRef} from 'react';
import Styles from './financial-receivables-list.styles';
import {useTranslation} from "../../../../../../modules/i18n/i18n.hook";
import {useInvoices} from "../../../../../invoices/invoices.context";
import logger from "../../../../../../managers/logger.manager";
import {Skeleton} from "antd";
import {InvoiceType} from "../../../../../../types/invoice.type";
import InvoicesListItem from "../../../../../invoices/components/invoices-list-item/invoices-list-item.component";
import DataPagination from "../../../../../../components/data-pagination/data-pagination.component";
import FinancialReceivablesListItem from "../financial-receivables-list-item/financial-receivables-list-item.component";

type Props = {};
const FinancialReceivablesList = ({}:Props) => {
    const {t} = useTranslation();
    const {current:{meta, data}, filters, loading, error, update} = useInvoices();
    const head = useRef<HTMLDivElement>(null);
    const updatePage = (p: number) => {
        update(p, filters).then(() => {
            if (!head.current) return;
            window.scrollTo({
                top: window.scrollY + head.current.getBoundingClientRect().top - 100,
                behavior: 'smooth'
            });
        });
    };
    logger.info('RECEIVABLE LIST INFO',window.scrollY, head.current, head.current?.getBoundingClientRect().top, head.current?.offsetTop);
    logger.info('RECEIVABLE LIST INFO',loading, error, data);
    return (
        <Styles ref={head}>
            {
                loading?(
                    <Skeleton/>
                ) : error ?(
                    <p>{error}</p>
                ) : !data.length? (
                    <p>{t('invoices:no-data')}</p>
                ) : (
                    <>
                        {data.map((inv: InvoiceType) => <FinancialReceivablesListItem {...inv} key={inv.id}/>)}
                        <DataPagination page={meta.current_page} setPage={updatePage} total={meta.total}/>
                    </>
                )
            }
        </Styles>
    );
};

export default FinancialReceivablesList;
