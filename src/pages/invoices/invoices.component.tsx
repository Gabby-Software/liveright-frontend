import React, {useState, useEffect} from 'react';
import Styles from './invoices.styles';
import PageSubtitle from "../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Carousel from "../../components/carousel/carousel.component";
import {overdueInvoices} from "./invoices.data";
import InvoiceCard from "./components/invoice-card/invoice-card.component";
import Hr from "../../components/hr/hr.styles";
import InvoiceFilters from "./components/invoice-filters/invoice-filters.component";
import {useIsMobile} from "../../hooks/is-mobile.hook";
import InvoicesList from "./components/invoices-list/invoices-list.component";
import InvoicesTable from "./components/invoices-table/invoices-table.component";
import {onlyClient} from "../../guards/client.guard";
import {useDispatch, useSelector} from "react-redux";
import {ACTION_GET_ATTENTION_INVOICES_REQUEST, ACTION_GET_INVOICES_REQUEST} from "../../store/action-types";
import {useAuth} from "../../hooks/auth.hook";
import {RootState} from "../../store/reducers";
import userTypes from "../../enums/user-types.enum";
import {InvoiceType} from "../../types/invoice.type";
import InvoicesAtention from "./components/invoices-atention/invoices-atention.component";
import {InvoicesProvider} from "./invoices.context";

const Invoices = () => {
    const isMobile = useIsMobile();
    return (
        <Styles>
            <InvoicesAtention/>
            <PageSubtitle>All your Invoice and billing history</PageSubtitle>

            <div className={'invoices__body'}>
                <InvoiceFilters/>
                {
                    isMobile ? <InvoicesList/> : <InvoicesTable/>
                }
            </div>
        </Styles>
    )
};

export default Invoices;
export const ClientInvoices = onlyClient(() => (
    <InvoicesProvider><Invoices/></InvoicesProvider>
));
