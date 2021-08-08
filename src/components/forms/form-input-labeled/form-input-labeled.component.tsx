import React, {useState, useEffect, FocusEventHandler} from 'react';
import Styles from './form-input-labeled.styles';
import {ErrorMessage, Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";
import {ReactComponent as WarningIcon} from '../../../assets/media/icons/warning.svg';
import {classes} from "../../../pipes/classes.pipe";
import logger from "../../../managers/logger.manager";
import {Formatter} from "../../../managers/formatter.manager";

type Props = {
    name: string,
    label: string,
    type?: string,
    icon?: React.ReactNode,
    onUpdate?: (name: string, value: string) => void,
    disabled?: boolean;
    format?: Formatter
};
type UIProps = Props & {
    value: string;
    onUpdate: (value: string) => void;
    error?: boolean;
    children?: React.ReactNode;
    onBlur?: FocusEventHandler<HTMLElement>;
    placeholder?: string;
    iconPrepend?: boolean;
}
export const FormInputLabeledUI = ({name, value, label, type, icon, onUpdate, disabled, error, children,placeholder, onBlur, iconPrepend}: UIProps) => {
    return (
        <Styles className={classes(
            'text_input__wrapper',
            error && 'text_input__error',
            icon && (iconPrepend ? 'text_input__icon-prepend' : 'text_input__icon'),

        )}>
            <label className={'text_input__cont'}>
                <div className={'text_input__label'}>{label}</div>
                <div className={'text_input__content'}>
                    <input className={'text_input__input'} type={type || 'text'} placeholder={placeholder}
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
const FormInputLabeled = ({name, label, type, onUpdate, icon, disabled, format}: Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <FormInputLabeledUI name={name} label={label} value={field.value}
                    onBlur={field.onChange} onUpdate={value=>{
                        const val = format?format.format(value):value;
                        form.setFieldValue(name, val);
                        onUpdate && onUpdate(name, val);
                    }}
                    type={type} icon={icon} disabled={disabled}>
                        <FormError name={name}/>
                    </FormInputLabeledUI>
                )}
        </Field>
    );
};

export default FormInputLabeled;
