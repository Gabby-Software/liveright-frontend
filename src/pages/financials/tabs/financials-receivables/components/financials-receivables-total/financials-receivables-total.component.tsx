import React, {useState, useEffect} from 'react';
import Styles from './financials-receivables-total.styles';
import {TotalsType} from "../../financials-receivables.data";

const FinancialsReceivablesTotal = ({label, note, value}:TotalsType) => {
    return (
        <Styles>
            <div className={'total__label'}>{label}</div>
            <div className={'total__value'}>{value}</div>
            <div className={'total__note'}>{note}</div>
        </Styles>
    );
};

export default FinancialsReceivablesTotal;
