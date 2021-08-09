import React, {useState, useEffect} from 'react';
import Styles from './receivables-attention.styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/reducers";
import PageSubtitle from "../../../../../../components/titles/page-subtitle.styles";
import Carousel from "../../../../../../components/carousel/carousel.component";
import {InvoiceType} from "../../../../../../types/invoice.type";
import InvoiceCard from "../../../../../invoices/components/invoice-card/invoice-card.component";
import Hr from "../../../../../../components/hr/hr.styles";
import ReceivablesAttentionItem from "../receivables-attention-item/receivables-attention-item.component";

type Props = {};
const ReceivablesAttention = ({}: Props) => {
    const {data} = useSelector((state: RootState) => state.invoices.needAttention);
    if (!data.length)
        return null;
    return (
        <>
            <PageSubtitle>Need your attention</PageSubtitle>
            <Carousel>
                {
                    data.map((inv: InvoiceType, i:number) => <ReceivablesAttentionItem key={inv.id} {...inv}/>)
                }
            </Carousel>
            <Hr/>
        </>
    )
};

export default ReceivablesAttention;
