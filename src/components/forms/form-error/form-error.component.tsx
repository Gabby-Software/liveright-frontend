import React, {useState, useEffect} from 'react';
import Styles from './form-error.styles';
import {Field, FieldProps} from "formik";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import logger from "../../../managers/logger.manager";
import {byString} from "../../../pipes/by-string.pipe";
export type FormErrorProps = {name: string};
export type FormErrorType = string | {key: string; values: any};
const FormError = ({name}: FormErrorProps) => {
    const {t} = useTranslation();
    return (
        <Field name={name}>
            {({field, form}: FieldProps) => {
                const msg = byString(form.errors, name);
                const touched = byString(form.touched, name);
                return (<Styles className={'form__error'}>{
                    !msg?null: !touched?null:
                    typeof msg === 'string'? t(`errors:${msg}`) : t(`errors:${msg.key}`, msg.values)}
                </Styles>)
            }}
        </Field>
    )
};

export default FormError;
