import React, {useState, useEffect, FocusEventHandler} from 'react';
import Styles from './form-input-labeled.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";
import {ReactComponent as WarningIcon} from '../../../assets/media/icons/warning.svg';
import {classes} from "../../../pipes/classes.pipe";
import logger from "../../../managers/logger.manager";

type Props = {
    name: string,
    label: string,
    type?: string,
    icon?: React.ReactNode,
    onUpdate?: (name: string, value: string) => void,
    disabled?: boolean;
};
type UIProps = Props & {
    value: string;
    onUpdate: (value: string) => void;
    error?: boolean;
    children?: React.ReactNode;
    onBlur?: FocusEventHandler<HTMLElement>;
    iconPrepend?: boolean;
}
export const FormInputLabeledUI = ({name, value, label, type, icon, onUpdate, disabled, error, children, onBlur, iconPrepend}: UIProps) => {
    return (
        <Styles className={classes(
            'text_input__wrapper',
            error && 'text_input__error',
            icon && (iconPrepend ? 'text_input__icon-prepend' : 'text_input__icon'),

        )}>
            <label className={'text_input__cont'}>
                <div className={'text_input__label'}>{label}</div>
                <div className={'text_input__content'}>
                    <input className={'text_input__input'} type={type || 'text'}
                           name={name} value={value} onBlur={onBlur}
                           disabled={!!disabled}
                           onChange={e => {
                               onUpdate(e.target.value);
                           }}/>
                    {icon || null}
                    {
                        error ? (
                            <WarningIcon className={'text_input__error'}/>
                        ) : null
                    }
                </div>
            </label>
            {children}
        </Styles>
    );
};
const FormInputLabeled = ({name, label, type, onUpdate, icon, disabled}: Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <FormInputLabeledUI name={name} label={label} value={field.value}
                    onBlur={field.onChange} onUpdate={value=>{
                        form.setFieldValue(name, value);
                        onUpdate && onUpdate(name, value);
                    }}
                    type={type} icon={icon} disabled={disabled}/>
                )}
        </Field>
    );
};

export default FormInputLabeled;
