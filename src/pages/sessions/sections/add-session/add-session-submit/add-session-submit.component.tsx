import React, {useState, useEffect} from 'react';
import Styles from './add-session-submit.styles';
import {Field, FieldProps} from "formik";
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import {classes} from "../../../../../pipes/classes.pipe";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {collapse, events} from "../add-session-calendar-full/add-session-calendar-full.component";
import {serviceTypes} from "../../../../../enums/service-type.enum";

type Props = {forEdit?: boolean};
const AddSessionSubmit = ({forEdit}: Props) => {
    const {t} = useTranslation();
    return (
        <Field name={''}>
            {
                ({form}: FieldProps) => {
                    const isCollapse = form.values.date && form.values.time && events.some(e => collapse(e.time, e.duration, form.values.time, form.values.duration));
                    const isUnderSessions = !forEdit && form.values.type === serviceTypes.PT_SESSION && form.values.sessions <= 0;
                    return (
                        <>
                            {
                                isUnderSessions ? (
                                    <Styles>{t('sessions:under-sessions')}</Styles>
                                ) : isCollapse ? (
                                    <Styles>{t('sessions:collapse')}</Styles>
                                ):null
                            }
                            <FormButton
                                className={classes('button-submit', 'add-session__form__submit')}
                                type={'primary'}
                                loading={form.isSubmitting}
                                htmlType={'submit'}
                                disabled={
                                    form.isSubmitting}
                            >{forEdit ? t('sessions:save') :isCollapse ? t('sessions:submit-anyway') : t('sessions:submit')}</FormButton>
                        </>
                    )
                }}
        </Field>
    );
};

export default AddSessionSubmit;