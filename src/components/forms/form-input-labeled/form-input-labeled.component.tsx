import React, {useState, useEffect} from 'react';
import Styles from './form-input-labeled.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";
import {HtmlType} from "../../../types/html.type";
import logger from "../../../managers/logger.manager";
import {classes} from "../../../pipes/classes.pipe";

type Props = {
    name: string,
    label: string,
    type?: string,
    icon?: React.ReactNode,
    onUpdate?: (name: string, value: string) => void
};
const FormInputLabeled = ({name, label, type, onUpdate, icon}: Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles className={classes('text_input__wrapper', form.errors[name] && form.touched[name] && 'text_input__error')}>
                        {logger.info('FIled',  form.errors, form,field)}
                        <label className={'text_input__cont'}>
                            <div className={'text_input__label'}>{label}</div>
                                <input className={'text_input__input'} type={type || 'text'}
                                       name={name} value={field.value} onBlur={field.onBlur}
                                       onChange={e => {
                                           form.setFieldValue(name, e.target.value);
                                           onUpdate && onUpdate(name, e.target.value);
                                       }}/>
                            {icon || null}
                        </label>
                        <FormError name={name}/>
                    </Styles>
                )}
        </Field>
    );
};

export default FormInputLabeled;
