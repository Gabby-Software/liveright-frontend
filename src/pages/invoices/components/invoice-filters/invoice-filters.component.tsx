import React, {useState, useEffect, useRef} from 'react';
import Styles from './invoice-filters.styles';
import {Form, Formik, FormikHelpers} from "formik";
import FormInputLabeled, {FormInputLabeledUI} from "../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {FormSelectUI} from "../../../../components/forms/form-select/form-select.component";
import {ReactComponent as SearchIcon} from "../../../../assets/media/icons/search.svg";
import {statuses} from "../../invoices.data";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import ButtonSubmit from "../../../../components/forms/button-submit/button-submit.component";
import {OptionType} from "../../../../types/option.type";
import userTypes from "../../../../enums/user-types.enum";
import DesktopAddInvoiceTrigger
    from "../../../../components/invoices/desktop-add-invoice-trigger/desktop-add-invoice-trigger.component";
import {useAuth} from "../../../../hooks/auth.hook";
import {Routes} from "../../../../enums/routes.enum";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ACTION_GET_CLIENTS_REQUEST, ACTION_GET_INVOICES_REQUEST} from "../../../../store/action-types";
import FormSelectIssuer from "../form-select-issuer/form-select-issuer.component";

type InvoicesFilterType = {
    search: string;
    status: string;
}
const initialValues = {
    search: '',
    status: 'All'
};
const InvoiceFilters = () => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const dispatch = useDispatch();
    const timer = useRef(0);
    const [issuers, setIssuers] = useState<OptionType[]>([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [invoice_from, setInvoice_from] = useState('');

    useEffect(() => {
        setIssuers([
            {label: 'All Issuers', value: ''},
            {label: 'issuer 1', value: '1'},
            {label: 'issuer 2', value: '2'},
            {label: 'issuer 3', value: '3'},
        ]);
    }, []);
    const fetchInvoices = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            dispatch({
                type: ACTION_GET_INVOICES_REQUEST, payload: {
                    filters: {search, status, invoice_from},
                    include: type===userTypes.CLIENT ? 'invoiceFrom' : 'invoiceTo',
                    page: 1
                }
            })
        }, 400) as unknown as number;
    }
    useEffect(fetchInvoices, [search, status, invoice_from]);
    return (
        <Styles className={'invoice-filters'}>
            <FormInputLabeledUI
                icon={<SearchIcon/>} iconPrepend
                value={search} name={'search'} label={t('search')} onUpdate={setSearch}/>
            <FormSelectUI value={status} name={'status'} label={t('invoices:status')} options={[{label:'All statuses', value:''}, ...statuses]} onUpdate={setStatus}/>
            {
                type === userTypes.CLIENT?(
                    <FormSelectIssuer value={invoice_from} name={'invoice_from'} label={t('invoices:issuer')}
                                  onUpdate={setInvoice_from}/>
                ):<div/>
            }
            <div/>
        </Styles>
    );
};

export default InvoiceFilters;
