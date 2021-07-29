import React, {useState, useEffect} from 'react';
import Styles from './form-datepicker.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";
import {DatePicker} from 'antd';
import moment, {Moment} from 'moment';
import {ReactComponent as CalendarIcon} from "../../../assets/media/icons/calendar.svg";
import {DatePickerProps} from "antd/es/date-picker";
import {classes} from "../../../pipes/classes.pipe";

type Props = DatePickerProps & {
    name: string;
    label: string;
    disabled?: boolean;
    onUpdate?: (name: string, value: string) => void;
};
const FormDatepicker = ({name, label, onUpdate, disabled, picker = 'date', ...props}: Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles className={'text_input__wrapper'}>
                        <label className={'text_input__cont'}>
                            <div className={'text_input__label'}>{label}</div>
                            <DatePicker
                                {...props}
                                suffixIcon={<CalendarIcon/>}
                                disabled={disabled}
                                allowClear={false}
                                value={field.value ? moment(field.value) : null}
                                className={classes('text_input__input', form.errors[name] && form.touched[name] && 'text_input__error',)}
                                onChange={(date, dateString: string) => {
                                    if (!date) return;
                                    form.setFieldValue(name, dateString);
                                    onUpdate && onUpdate(name, dateString);
                                }} onBlur={field.onBlur}
                            />
                        </label>
                        <FormError name={name}/>
                    </Styles>
                )
            }
        </Field>
    );
};

export default FormDatepicker;
