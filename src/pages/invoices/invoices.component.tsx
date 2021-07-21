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

const Invoices = () => {
    const {t} = useTranslation();
    const isMobile = useIsMobile();
    return (
        <Styles>
            <PageSubtitle>Need your attention</PageSubtitle>
            <Carousel>
                {
                    overdueInvoices.map((inv, i) => <InvoiceCard key={inv.id} {...inv}/>)
                }
            </Carousel>
            <Hr/>
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
