import React, {useState, useEffect} from 'react';
import Styles from './invoice.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import {Redirect, useParams} from "react-router";
import InvoiceMobile from "./invoice-mobile/invoice-mobile.component";
import InvoiceDesktop from "./invoice-desktop/invoice-desktop.component";
import APIGet from "../../hoc/api-get";
import {EP_GET_INVOICES} from "../../enums/api.enum";
import {Skeleton} from "antd";
import {useAuth} from "../../hooks/auth.hook";
import userTypes from "../../enums/user-types.enum";
import {useTitle} from "../../hooks/title.hook";

const Invoice = () => {
    const isMobile = useIsMobile();
    const {id} = useParams<{ id: string }>();
    const {type} = useAuth();
    useTitle(`Invoice #${id}`);
    return (
        <APIGet url={EP_GET_INVOICES+`/${id}`}>
            {
                ({loading, error}) => {
                    if(loading) return <Skeleton/>;
                    if(error) return <p>{error}</p>;
                    if(isMobile) return <InvoiceMobile/>;
                    return <InvoiceDesktop/>;
                }
            }
        </APIGet>
    );

};

export default Invoice;
