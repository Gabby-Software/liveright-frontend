import React, {useState, useEffect} from 'react';
import Styles from './invoices-atention.styles';
import PageSubtitle from "../../../../components/titles/page-subtitle.styles";
import Carousel from "../../../../components/carousel/carousel.component";
import {InvoiceType} from "../../../../types/invoice.type";
import InvoiceCard from "../invoice-card/invoice-card.component";
import Hr from "../../../../components/hr/hr.styles";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers";
import {useInvoices} from "../../invoices.context";

type Props = {};
const InvoicesAtention = ({}: Props) => {
    const {data} = useInvoices().needAttention;
    if (!data?.length)
        return null;
    return (
        <>
            <PageSubtitle>Need your attention</PageSubtitle>
            <Carousel>
                {
                    data.map((inv: InvoiceType) => <InvoiceCard key={inv.id} {...inv}/>)
                }
            </Carousel>
            <Hr/>
        </>
    )
};

export default InvoicesAtention;
