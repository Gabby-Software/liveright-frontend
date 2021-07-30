import React, {useState, useEffect} from 'react';
import Styles from './invoice.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import {Redirect, useParams} from "react-router";
import {Routes} from "../../enums/routes.enum";
import InvoiceView from "./invoice-view/invoice-view.component";
import InvoiceAttendees from "./sections/invoice-attendees/invoice-attendees.component";
import InvoiceDetails from "./sections/invoice-details/invoice-details.component";
import InvoiceInfo from "./sections/invoice-info/invoice-info.component";
import {onlyClient} from "../../guards/client.guard";
import InvoiceMobile from "./invoice-mobile/invoice-mobile.component";
import InvoiceDesktop from "./invoice-desktop/invoice-desktop.component";
import APIGet from "../../hoc/api-get";
import {EP_GET_INVOICES} from "../../enums/api.enum";
import {Skeleton} from "antd";
import {useAuth} from "../../hooks/auth.hook";
import userTypes from "../../enums/user-types.enum";

const Invoice = () => {
    const isMobile = useIsMobile();
    const {id} = useParams<{ id: string }>();
    const {type} = useAuth();
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
