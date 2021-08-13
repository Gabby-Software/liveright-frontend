import React, {useState, useEffect, useRef} from 'react';
import Styles from './finanials-receivables-filters.styles';
import {useTranslation} from "../../../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../../../hooks/auth.hook";
import {useDispatch, useSelector} from "react-redux";
import {useInvoices} from "../../../../../invoices/invoices.context";
import {FormInputLabeledUI} from "../../../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {ReactComponent as SearchIcon} from "../../../../../../assets/media/icons/search.svg";
import {FormSelectUI} from "../../../../../../components/forms/form-select/form-select.component";
import {statuses} from "../../../../../invoices/invoices.data";
import userTypes from "../../../../../../enums/user-types.enum";
import FormSelectIssuer from "../../../../../invoices/components/form-select-issuer/form-select-issuer.component";
import {ACTION_GET_INVOICES_REQUEST} from "../../../../../../store/action-types";
import {RootState} from "../../../../../../store/reducers";

type Props = {};
const FinanialsReceivablesFilters = ({}: Props) => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const dispatch = useDispatch();
    const timer = useRef(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [invoice_to, setInvoice_to] = useState('');
    const {current: {meta}, filters} = useSelector((state: RootState) => state.invoices);
    const fetchInvoices = () => {
        clearTimeout(timer.current);
        setTimeout(() => {
            dispatch({
                type: ACTION_GET_INVOICES_REQUEST, payload: {
                    include: 'invoiceTo',
                    filters: {search, status, invoice_to},
                    page: 1
                }
            });
        }, 400);
    }
    useEffect(fetchInvoices, [search, status, invoice_to]);
    return (
        <Styles className={'invoice-filters'}>
            <FormInputLabeledUI
                icon={<SearchIcon/>} iconPrepend
                value={search} name={'search'} label={t('search')} onUpdate={setSearch}/>
            <FormSelectUI value={status} name={'status'} label={t('invoices:status')}
                          options={[{label: 'All statuses', value: ''}, ...statuses]} onUpdate={setStatus}/>
            <FormSelectIssuer value={invoice_to} name={'invoice_to'} label={t('invoices:issued-to')}
                               onUpdate={setInvoice_to}/>

            <div/>
        </Styles>
    );
};

export default FinanialsReceivablesFilters;
