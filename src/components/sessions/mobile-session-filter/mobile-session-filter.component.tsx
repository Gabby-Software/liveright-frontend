import React, {useState, useEffect} from 'react';
import Styles from './mobile-session-filter.styles';
import BottomDrawer from "../../bottom-drawer/bottom-drawer.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {SessionFilterType} from "../../../types/sessions-filter.type";
import {Formik, Form, FormikHelpers} from "formik";
import FormDrawerSelect from "../../forms/form-drawer-select/form-drawer-select.component";
import {sessionStatusOptions, sessionTimelineOptions, sessionTypeOptions} from "../../../enums/session-filters.enum";
import ButtonSubmit from "../../forms/button-submit/button-submit.component";

const initialValues: SessionFilterType = {
    status: 'All',
    timeline: 'All',
    session_type: 'All'
};
const MobileSessionFilter = () => {
    const [isOpen, setOpen] = useState(false);
    const {t} = useTranslation();
    const handleSubmit = (values: SessionFilterType, helper: FormikHelpers<SessionFilterType>) => {
        // todo: handle submit
        helper.setSubmitting(false);
        setOpen(false);
    };
    return (
        <>
            <button style={{display: 'none'}} id={'filter-options'} onClick={() => setOpen(true)}/>
            <BottomDrawer title={t('invoices:filters')} isOpen={isOpen} onClose={() => setOpen(false)}>
                <Formik initialValues={initialValues}
                        onSubmit={handleSubmit}>
                    <Form>
                        <Styles>
                            <FormDrawerSelect name={'status'} label={t('sessions:status')}
                                              options={sessionStatusOptions}/>
                            <FormDrawerSelect name={'timeline'} label={t('sessions:timeline')}
                                              options={sessionTimelineOptions}/>
                            <FormDrawerSelect name={'session_type'} label={t('sessions:type')}
                                              options={sessionTypeOptions}/>
                            <ButtonSubmit>{t('submit')}</ButtonSubmit>
                        </Styles>
                    </Form>
                </Formik>
            </BottomDrawer>
        </>
    )
};

export default MobileSessionFilter;
