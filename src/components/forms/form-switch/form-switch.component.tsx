import React, {useState, useEffect} from 'react';
import Styles from './form-switch.styles';
import {FormikProps, Field, FieldProps, ErrorMessage} from 'formik';
import {classes} from "../../../pipes/classes.pipe";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import FormError from "../form-error/form-error.component";
type Props = {
    name: string;
    options: {label: string, value: string}[];
}
const FormSwitch = ({name, options}: Props) => {
    const {t} = useTranslation();
    return (
            <Field name={name}>
                {
                    ({field,form}:FieldProps) => (
                        <Styles className={'switch__wrapper'}>
                            <div className={'switch'}>
                            {options.map(p => (
                                <div key={p.value} className={classes('switch__item', field.value === p.value && 'switch__item__active')}
                                     onClick={() => form.setFieldValue(name,p.value)}><span>{p.label}</span></div>
                            ))}
                            </div>
                            <FormError name={name}/>
                        </Styles>
                    )
                }
            </Field>
    )
};

export default FormSwitch;
