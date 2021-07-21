import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile.styles';
import InvoiceMobileHead from "../sections/invoice-mobile-head/invoice-mobile-head.component";
import InvoiceMobileDetails from "../sections/invoice-mobile-details/invoice-mobile-details.component";
import InvoiceMobileSummary from "../sections/invoice-mobile-summary/invoice-mobile-summary.component";

type Props = {};
const InvoiceMobile = ({}:Props) => {
    return (
        <Styles>
            <InvoiceMobileHead/>
            <InvoiceMobileDetails/>
            <InvoiceMobileSummary/>
        </Styles>
    );
};

export default InvoiceMobile;
