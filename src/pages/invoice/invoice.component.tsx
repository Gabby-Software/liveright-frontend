import React, {useState, useEffect} from 'react';
import Styles from './invoice.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import {Redirect, useParams} from "react-router";
import {Routes} from "../../enums/routes.enum";
import InvoiceView from "./invoice-view/invoice-view.component";

const Invoice = () => {
    const isMobile = useIsMobile();
    const {id} = useParams<{id: string}>();
    return null;
    // if(!isMobile) return (<Redirect to={Routes.INVOICES}/>);
    return (
        <Styles>
            <InvoiceView id={+id}/>
        </Styles>
    )
};

export default Invoice;
