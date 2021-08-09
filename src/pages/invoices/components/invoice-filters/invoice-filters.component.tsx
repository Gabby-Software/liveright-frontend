import React, {useState, useEffect} from 'react';
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
    const [issuers, setIssuers] = useState<OptionType[]>([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [issuer, setIssuer] = useState('');
    useEffect(() => {
        setIssuers([
            {label: 'All Issuers', value: ''},
            {label: 'issuer 1', value: '1'},
            {label: 'issuer 2', value: '2'},
            {label: 'issuer 3', value: '3'},
        ]);
    }, []);
    useEffect(() => {
        // todo: Update inoices list
    }, [search, status, issuers]);
    return (
        <Styles className={'invoice-filters'}>
            <FormInputLabeledUI
                icon={<SearchIcon/>} iconPrepend
                value={search} name={'search'} label={t('search')} onUpdate={setSearch}/>
            <FormSelectUI value={status} name={'status'} label={t('invoices:status')} options={[{label:'All statuses', value:''}, ...statuses]} onUpdate={setStatus}/>
            {
                type === userTypes.CLIENT?(
                    <FormSelectUI value={issuer} name={'issuer'} label={t('invoices:issuer')} options={issuers} onUpdate={setIssuer}/>
                ):<div/>
            }
            <div/>
        </Styles>
    );
};

export default InvoiceFilters;
