import React, {useState, useEffect} from 'react';
import Styles from './form-input.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";

type Props = {name:string, label: string, type?:string, onUpdate?:(name:string,value:string)=>void};
const FormInput = ({name, label, type, onUpdate}:Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles className={'text_input__wrapper'}>
                        <div className={'text_input__cont'}>
                            <input className={'text_input__input'} type={type||'text'}
                                   value={field.value} onBlur={field.onBlur}
                                   onChange={e => {
                                       form.setFieldValue(name, e.target.value);
                                       onUpdate && onUpdate(name, e.target.value);
                                   }}/>
                            <label className={'text_input__label'}>{label}</label>
                        </div>
                        <FormError name={name}/>
                    </Styles>
                )}
        </Field>
    );
};

export default FormInput;
