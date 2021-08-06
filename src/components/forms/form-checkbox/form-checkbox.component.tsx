import React, {useState, useEffect} from 'react';
import {Field, FieldProps} from 'formik';
import Styles from './form-checkbox.styles';

type Props = {
    name: string;
    label: string;
}
const FormCheckbox = ({name, label}:Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}:FieldProps) => (
                    <Styles className={'form-cbx__wrapper'}>
                        <input className={'form-cbx__input'} type={'checkbox'} {...field}
                            checked={field.value}/>
                        <span className={'form-cbx__label'}>{label}</span>
                    </Styles>
                )
            }
        </Field>
    )
};

export default FormCheckbox;
