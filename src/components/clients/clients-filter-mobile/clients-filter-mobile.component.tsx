import React, {useState, useEffect} from 'react';
import Styles from './clients-filter-mobile.styles';
import BottomDrawer from "../../bottom-drawer/bottom-drawer.component";
import {Form, Formik, FormikHelpers} from "formik";
import FormDrawerSelect from "../../forms/form-drawer-select/form-drawer-select.component";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import FormInputLabeled from "../../forms/form-input-labeled/form-input-labeled.component";
import {useDispatch} from "react-redux";
import {useClients} from "../../../hooks/clients.hook";
import {ACTION_GET_CLIENTS_REQUEST} from "../../../store/action-types";

type FilterType = {
    search: string;
}
const initialValues: FilterType = {
    search: ''
};
const ClientsFilterMobile = () => {
    const [isOpen, setOpen] = useState(false);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {filters, data: {meta}} = useClients();
    useEffect(() => {
        dispatch({
            type: ACTION_GET_CLIENTS_REQUEST, payload: {
                page: meta.current_page,
                query: filters.query,
                status: filters.status
            }
        })
    }, []);
    const handleSubmit = (values: FilterType, helper: FormikHelpers<FilterType>) => {
        dispatch({
            type: ACTION_GET_CLIENTS_REQUEST, payload: {
                page: meta.current_page,
                query: filters.query,
                status: filters.status,
                onSuccess: () => {
                    helper.setSubmitting(false);
                },
                onError: () => {
                    helper.setSubmitting(false);
                }
            }
        });
        setOpen(false);
    };
    return (
        <>
            <button style={{display: 'none'}} id={'filter-options'} onClick={() => setOpen(true)}/>
            <BottomDrawer title={t('invoices:filters')} isOpen={isOpen} onClose={() => setOpen(false)}>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    <Form>
                        <Styles>
                            <FormInputLabeled name={'search'} label={t('search')}/>
                            <ButtonSubmit>{t('submit')}</ButtonSubmit>
                        </Styles>
                    </Form>
                </Formik>
            </BottomDrawer>
        </>
    )
};

export default ClientsFilterMobile;
