import React, {useState, useEffect, memo, FC, ReactNode} from 'react';
import Styles from './invoice.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import {Redirect, useParams} from "react-router";
import InvoiceMobile from "./invoice-mobile/invoice-mobile.component";
import InvoiceDesktop from "./invoice-desktop/invoice-desktop.component";
import APIGet, {useAPIData} from "../../hoc/api-get";
import {EP_GET_INVOICES} from "../../enums/api.enum";
import {Skeleton} from "antd";
import {useAuth} from "../../hooks/auth.hook";
import userTypes from "../../enums/user-types.enum";
import {useTitle} from "../../hooks/title.hook";
import {useMobileBack} from "../../components/mobile-back/mobile-back.component";
import {Routes} from "../../enums/routes.enum";
import {usePusher} from "../../modules/notifications/hooks/pusher.hook";
import {FileType} from "../../types/file.type";
import {InvoiceFullType} from "../../types/invoice.type";

const PDFHandler: FC<{ id: string, children: ReactNode }> = ({children, id}) => {
    type PDFType = { pdf: FileType };
    usePusher<PDFType>(`invoice.${id}.pdf-generated`, `event.invoice`, updatePDF, [id]);
    const {data, setData} = useAPIData<InvoiceFullType>();

    function updatePDF({pdf}: PDFType) {
        setData({
            ...data,
            pdf
        });
    }

    return <>{children}</>;
}
const Invoice = () => {
    const isMobile = useIsMobile();
    const {id} = useParams<{ id: string }>();
    const {type} = useAuth();
    useMobileBack(type === userTypes.CLIENT ? Routes.INVOICES : Routes.FINANCIALS_RECEIVABLES, 'invoices');
    useTitle(`Invoice #${id}`);
    return (
        <APIGet url={EP_GET_INVOICES + `/${id}`}>
            {
                ({loading, error}) => {
                    if (loading) return <Skeleton/>;
                    if (error) return <p>{error}</p>;
                    return (
                        <PDFHandler id={id}>
                            {isMobile ? <InvoiceMobile/> : <InvoiceDesktop/>}
                        </PDFHandler>
                    )
                }
            }
        </APIGet>
    );

};

export default Invoice;
