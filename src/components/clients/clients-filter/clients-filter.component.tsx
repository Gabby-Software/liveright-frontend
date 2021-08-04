import React, {useState, useEffect} from 'react';
import Styles from './clients-filter.styles';
import {Form, Formik, FormikHelpers} from "formik";
import FormRow from "../../forms/form-row/form-row.component";
import FormInputLabeled, {FormInputLabeledUI} from "../../forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";
import FormButton from "../../forms/form-button/form-button.component";
import AddClientModal from "../add-client-modal/add-client-modal.component";
import {useClients} from "../../../hooks/clients.hook";
import {useDispatch} from "react-redux";
import {ACTION_UPDATE_CLIENTS_FILTERS} from "../../../store/action-types";
import {FormSelectUI} from "../../forms/form-select/form-select.component";
import {OptionType} from "../../../types/option.type";
import {ReactComponent as SearchIcon} from "../../../assets/media/icons/search.svg";

type FilterType = {
    search: string;
}
const initialValues = {
    search: '',
};
const ClientsFilter = () => {
    const {t} = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const {filters} = useClients();
    const dispatch = useDispatch();
    const update = (name: string) => (value: string) => {
        dispatch({
            type: ACTION_UPDATE_CLIENTS_FILTERS, payload: {
                ...filters,
                [name]: [value]
            }
        });
    };
    const handleSubmit = (values: FilterType, helper: FormikHelpers<FilterType>) => {
        // todo: handle submition
        helper.setSubmitting(false);
    };
    const typeOptions: OptionType[] = [
        {label: 'All', value: ''},
        {label: 'Leads', value: 'leads'},
        {label: 'Clients', value: 'clients'},
    ];
    const statusOptions: OptionType[] = [
        {label: 'All', value: ''},
        {label: 'Active', value: 'active'},
        {label: 'Awaiting', value: 'awaiting'},
        {label: 'Past', value: 'past'},
    ];
    return (
        <Styles>
            <FormRow>
                <FormInputLabeledUI
                    icon={<SearchIcon/>} iconPrepend
                    value={filters.search} name={'search'} label={t('search')}
                                    onUpdate={update('search')}/>
                <FormSelectUI name={'type'} value={filters.type} label={t('clients:type')}
                              options={typeOptions} onUpdate={update('type')}/>
                <FormSelectUI name={'status'} value={filters.status} label={t('clients:status')}
                              options={statusOptions} onUpdate={update('status')}/>
                <div className={
                    'clients__cta'
                }>
                    <FormButton type={'primary'} className={'clients__add'}
                                onClick={() => setModalOpen(true)}
                    >{t('clients:add')}</FormButton>
                </div>
                <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
            </FormRow>
        </Styles>
    )
};

export default ClientsFilter;
