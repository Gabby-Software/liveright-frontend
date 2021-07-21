import React, {useState, useEffect, useRef} from 'react';
import Styles from './invoices-list.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {invoices} from "../../invoices.data";
import InvoicesListItem from "../invoices-list-item/invoices-list-item.component";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import logger from "../../../../managers/logger.manager";
import {useAuth} from "../../../../hooks/auth.hook";

const InvoicesList = () => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const [page, setPage] = useState(1);
    const head = useRef<HTMLDivElement>(null);
    const updatePage = (p: number) => {
        setPage(p);
        setTimeout(() => {
            if (!head.current) return;
            logger.info('OOO',window.scrollY, head.current, head.current?.getBoundingClientRect().top, head.current?.offsetTop)
            window.scrollTo({top: window.scrollY + head.current.getBoundingClientRect().top - 100, behavior: 'smooth'});
        });
    };
    logger.info(window.scrollY, head.current, head.current?.getBoundingClientRect().top, head.current?.offsetTop)
    return (
        <Styles ref={head}>
            {invoices.slice((page-1)*10, page*10).map(inv => <InvoicesListItem {...inv} key={inv.id}/>)}
            <DataPagination page={page} setPage={updatePage} total={invoices.length}/>
        </Styles>
    );
};

export default InvoicesList;
