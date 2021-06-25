import React, {useState, useEffect} from 'react';
import Styles from './form-error.styles';
import {ErrorMessage} from "formik";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
export type FormErrorProps = {name: string};
export type FormErrorType = string | {key: string; values: any};
const FormError = ({name}: FormErrorProps) => {
    const {t} = useTranslation();
    return (
        <ErrorMessage name={name}>
            {(msg: FormErrorType) => <Styles className={'form__error'}>{
                typeof msg === 'string'? t(`errors:${msg}`) : t(`errors:${msg.key}`, msg.values)
            }</Styles>}
        </ErrorMessage>
    )
};

export default FormError;
