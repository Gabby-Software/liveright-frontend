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
import {useIsMobile} from "../../hooks/is-mobile.hook";
import MobileInvoices from "./mobile-invoices/mobile-invoices.component";
import DesktopInvoices from "./desktop-invoices/desktop-invoices.component";

const Invoices = () => {
    const isMobile = useIsMobile();
    if(isMobile) return <MobileInvoices/>;
    return <DesktopInvoices/>;
};

export default Invoices;
