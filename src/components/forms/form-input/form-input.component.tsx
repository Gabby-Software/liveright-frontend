import React, {useState, useEffect, FC, FocusEventHandler, ReactNode} from 'react';
import Styles from './form-input.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";
import {classes} from "../../../pipes/classes.pipe";
import logger from "../../../managers/logger.manager";

type UIProps = {
    name: string;
    value: string;
    label: string;
    type?: string;
    onUpdate: (val: string) => void;
    onBlur?: FocusEventHandler;
    icon?: ReactNode
}
export const FormInputUI: FC<UIProps> = ({name, value, label, type, onUpdate, onBlur, icon, children}) => {
    return (
        <Styles className={classes('text_input__wrapper', icon && 'text_input__icon')}>
            <div className={'text_input__cont'}>
                <input className={'text_input__input'}
                       type={type||'text'}
                       name={name}
                       value={value} onBlur={onBlur}
                       onChange={e => {
                           onUpdate(e.target.value);
                       }}/>
                {icon}
                <label className={'text_input__label'}>{label}</label>
            </div>
            {children}
        </Styles>
    );
}
type Props = {name:string, label: string, type?:string, onUpdate?:(name:string,value:string)=>void};
const FormInput = ({name, label, type, onUpdate}:Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <FormInputUI {...field} label={label}
                               type={type||'text'}
                               onUpdate={val => {
                                   form.setFieldValue(name, val);
                                   onUpdate && onUpdate(name, val);
                               }}
                    >
                        <FormError name={name}/>
                    </FormInputUI>
                )}
        </Field>
    );
};

export default FormInput;
