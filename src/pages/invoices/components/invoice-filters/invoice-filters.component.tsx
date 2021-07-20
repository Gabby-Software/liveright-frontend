import React, {useState, useEffect} from 'react';
import Styles from './invoice-filters.styles';
import {Form, Formik, FormikHelpers} from "formik";
import FormInputLabeled from "../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import {statuses} from "../../invoices.data";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import ButtonSubmit from "../../../../components/forms/button-submit/button-submit.component";

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
    const onSubmit = (values: InvoicesFilterType, helper: FormikHelpers<InvoicesFilterType>) => {
        helper.setSubmitting(false);
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form>
                <Styles className={'invoice-filters'}>
                    <FormInputLabeled name={'search'} label={t('search')}/>
                    <FormSelect name={'status'} label={t('invoices:status')} options={statuses}/>
                    <div/>
                    <ButtonSubmit>{t('apply-filters')}</ButtonSubmit>
                </Styles>
            </Form>
        </Formik>
    );
};

export default InvoiceFilters;
