import React, {useState, useEffect} from 'react';
import Styles from './form-input-labeled.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";

type Props = {name:string, label: string, type?:string, onUpdate?:(name:string,value:string)=>void};
const FormInputLabeled = ({name, label, type, onUpdate}:Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles className={'text_input__wrapper'}>
                        <label className={'text_input__cont'}>
                            <div className={'text_input__label'}>{label}</div>
                            <input className={'text_input__input'} type={type||'text'}
                                   name={name} value={field.value} onBlur={field.onBlur}
                                   onChange={e => {
                                       form.setFieldValue(name, e.target.value);
                                       onUpdate && onUpdate(name, e.target.value);
                                   }}/>
                        </label>
                        <FormError name={name}/>
                    </Styles>
                )}
        </Field>
    );
};

export default FormInputLabeled;
