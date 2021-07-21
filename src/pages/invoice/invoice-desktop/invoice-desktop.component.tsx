import React, {useState, useEffect} from 'react';
import Styles from './invoice-desktop.styles';
import InvoiceAttendees from "../../invoice/sections/invoice-attendees/invoice-attendees.component";
import InvoiceInfo from "../../invoice/sections/invoice-info/invoice-info.component";
import InvoiceDetails from "../../invoice/sections/invoice-details/invoice-details.component";

type Props = {};
const InvoiceDesktop = ({}:Props) => {
    return (
        <Styles>
            <InvoiceAttendees/>
            <InvoiceDetails/>
            <InvoiceInfo/>
        </Styles>
    );
};

export default InvoiceDesktop;
