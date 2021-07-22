import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile.styles';
import InvoiceMobileHead from "../sections/invoice-mobile-head/invoice-mobile-head.component";
import InvoiceMobileDetails from "../sections/invoice-mobile-details/invoice-mobile-details.component";
import InvoiceMobileSummary from "../sections/invoice-mobile-summary/invoice-mobile-summary.component";
import {useMobileBack} from "../../../components/mobile-back/mobile-back.component";
import {Routes} from "../../../enums/routes.enum";

type Props = {};
const InvoiceMobile = ({}:Props) => {
    useMobileBack(Routes.INVOICES,'invoices');
    return (
        <Styles>
            <InvoiceMobileHead/>
            <InvoiceMobileDetails/>
            <InvoiceMobileSummary/>
        </Styles>
    );
};

export default InvoiceMobile;
