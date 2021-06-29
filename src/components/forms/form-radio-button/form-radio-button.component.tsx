import React, {useState, useEffect} from 'react';
import Styles from './form-radio-button.styles';
import {Field, FieldProps} from 'formik';
import FormError from "../form-error/form-error.component";
import FormRadioSelect from "../form-radio-select/form-radio-select.component";
import {classes} from "../../../pipes/classes.pipe";

type Props = {
    name: string;
    options: { value: string, label: string }[];
}
const FormRadio = ({name, options}: Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles className={'radio__wrapper'}>
                        <div className={'radio__cont'}>
                            <div className={'radio'}>
                                {options.map(({value, label}) => (
                                    <div tabIndex={1} className={classes('radio__button', value === field.value && 'radio__button__active')}
                                         onClick={() => form.setFieldValue(name, value)} onBlur={form.handleBlur}>{label}</div>
                                ))}
                            </div>
                        </div>
                        <FormError name={name}/>
                    </Styles>
                )
            }
        </Field>
    );
};


export default FormRadio;
