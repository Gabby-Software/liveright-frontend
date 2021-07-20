import React, {useState, useEffect} from 'react';
import Styles from './invoices-list.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {invoices} from "../../invoices.data";
import InvoicesListItem from "../invoices-list-item/invoices-list-item.component";

const InvoicesList = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    return (
        <Styles>
            {invoices.slice((page-1)*10, page*10).map(inv => <InvoicesListItem {...inv} key={inv.id}/>)}
        </Styles>
    );
};

export default InvoicesList;
