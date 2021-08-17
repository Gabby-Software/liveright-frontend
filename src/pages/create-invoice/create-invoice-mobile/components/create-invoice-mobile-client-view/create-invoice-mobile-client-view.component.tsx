import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-mobile-client-view.styles';
import {useInvoiceForm} from "../../../create-invoice.context";
import {createInvoiceSteps} from "../../../create-invoice.data";

const CreateInvoiceMobileClientView = () => {
    const {client, setStep} = useInvoiceForm();
    return (
        <Styles onClick={() => setStep(createInvoiceSteps.CLIENT)}>
            <span className={'ci-preview__client__label'}>to</span>
            <span className={'ci-preview__client__value'}>{client?.first_name} {client?.last_name}</span>
        </Styles>
    );
};

export default CreateInvoiceMobileClientView;
