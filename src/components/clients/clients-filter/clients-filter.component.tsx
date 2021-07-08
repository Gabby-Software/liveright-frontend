import React, {useState, useEffect} from 'react';
import Styles from './clients-filter.styles';
import {Form, Formik, FormikHelpers} from "formik";
import FormRow from "../../forms/form-row/form-row.component";
import FormInputLabeled from "../../forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";
import FormButton from "../../forms/form-button/form-button.component";

type FilterType = {
    search: string;
}
const initialValues = {
    search: '',
};
const ClientsFilter = () => {
    const {t} = useTranslation();
    const handleSubmit = (values: FilterType, helper: FormikHelpers<FilterType>) => {
        // todo: handle submition
        helper.setSubmitting(false);
    };
    return (
        <Styles>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form>
                    <FormRow>
                        <FormInputLabeled name={'search'} label={t('search')}/>
                        <ButtonSubmit>{t('apply-filters')}</ButtonSubmit>
                    </FormRow>
                </Form>
            </Formik>
            <FormButton type={'link'} className={'clients__add'}>{t('clients:add')}</FormButton>
        </Styles>
    )
};

export default ClientsFilter;
