import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-mobile.styles';
import {CreateInvoiceProvider, useInvoiceForm} from "../create-invoice.context";
import Steps from "../../../components/steps/steps.component";
import CreateInvoiceMobileClient
    from "./components/create-invoice-mobile-client/create-invoice-mobile-client.component";
import CreateInvoiceMobileDetails
    from "./components/create-invoice-mobile-details/create-invoice-mobile-details.component";
import CreateInvoiceMobileItems from "./components/create-invoice-mobile-items/create-invoice-mobile-items.component";
import CreateInvoiceMobileNotes from "./components/create-invoice-mobile-notes/create-invoice-mobile-notes.component";
import {createInvoiceSteps} from "../create-invoice.data";

const CreateInvoiceMobileContent = () => {
    const {step} = useInvoiceForm();
    const steps: {[key:number]: React.ReactNode} = {
        [createInvoiceSteps.CLIENT]: <CreateInvoiceMobileClient/>,
        [createInvoiceSteps.DETAILS]: <CreateInvoiceMobileDetails/>,
        [createInvoiceSteps.ITEMS]: <CreateInvoiceMobileItems/>,
        [createInvoiceSteps.NOTES]: <CreateInvoiceMobileNotes/>,
    };
    return (
        <Styles>
            {steps[step]}
        </Styles>
    );
};
const CreateInvoiceMobile = () => <CreateInvoiceProvider><CreateInvoiceMobileContent/></CreateInvoiceProvider>
export default CreateInvoiceMobile;
