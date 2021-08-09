import React, {useState, useEffect} from 'react';
import Styles from './financials-receivables-totals.styles';
import {TotalsType} from "../../financials-receivables.data";
import FinancialsReceivablesTotal from "../financials-receivables-total/financials-receivables-total.component";

type Props = {
    data: TotalsType[]
};
const FinancialsReceivablesTotals = ({data}:Props) => {
    return (
        <Styles>
            {
                data.map(total => <FinancialsReceivablesTotal {...total}/>)
            }
        </Styles>
    )
};

export default FinancialsReceivablesTotals;
