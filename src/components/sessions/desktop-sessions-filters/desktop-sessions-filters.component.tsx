import React, {useState, useEffect} from 'react';
import Styles from './desktop-sessions-filters.styles';
import {InvoiceFiltersType} from "../../../types/invoice-filters.type";
import {Formik, Form, FormikHelpers} from "formik";
import {SessionFilterType} from "../../../types/sessions-filter.type";
import FormRow from "../../forms/form-row/form-row.component";
import FormSelect from "../../forms/form-select/form-select.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {sessionStatusOptions, sessionTimelineOptions, sessionTypeOptions} from "../../../enums/session-filters.enum";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";
import {useAuth} from "../../../hooks/auth.hook";
import userTypes from "../../../enums/user-types.enum";
import FormButton from "../../forms/form-button/form-button.component";
import SessionAddModal from "../session-add-modal/session-add-modal.component";

const initialValues: SessionFilterType = {
    session_type: 'All',
    timeline: "All",
    status: 'All'
};
const DesktopSessionsFilters = () => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const handleSubmit = (values: SessionFilterType, helper: FormikHelpers<SessionFilterType>) => {
        alert('filtering..');
        helper.setSubmitting(false);
    };
    return (
        <Styles>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}>
                <Form>
                    <FormRow>
                        <FormSelect name={'status'} label={t('sessions:status')} options={sessionStatusOptions}/>
                        <FormSelect name={'timeline'} label={t('sessions:timeline')} options={sessionTimelineOptions}/>
                        <FormSelect name={'session_type'} label={t('sessions:type')} options={sessionTypeOptions}/>
                        <ButtonSubmit>{t('apply-filters')}</ButtonSubmit>
                        {
                            type === userTypes.TRAINER ? (
                                <FormButton type={'link'}
                                            onClick={() => setAddOpen(true)}
                                >{t('sessions:add')}</FormButton>
                            ): null
                        }
                    </FormRow>
                </Form>
            </Formik>
            <SessionAddModal isOpen={addOpen} onClose={() => setAddOpen(false)}/>
        </Styles>
    );
};

export default DesktopSessionsFilters;
