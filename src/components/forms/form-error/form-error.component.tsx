import React, {useState, useEffect} from 'react';
import Styles from './form-error.styles';
import {ErrorMessage} from "formik";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
export type FormErrorProps = {name: string};
const FormError = ({name}: FormErrorProps) => {
    const {t} = useTranslation();
    return (
        <ErrorMessage name={name}>
            {(msg:string) => <Styles className={'form__error'}>{t(`errors:${msg}`)}</Styles>}
        </ErrorMessage>
    )
};

export default FormError;
