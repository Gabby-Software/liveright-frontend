import React, {useState, useEffect} from 'react';
import Styles from './form-timepicker.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";
import {DatePicker, TimePicker} from 'antd';
import moment from 'moment';
import {ReactComponent as CalendarIcon} from "../../../assets/media/icons/calendar.svg";
import {classes} from "../../../pipes/classes.pipe";

type Props = {
    name:string;
    label: string;
    disabled?: boolean;
    onUpdate?:(name:string,value:string)=>void;
};
const FormTimepicker = ({name, label, onUpdate, disabled}: Props) => {
    const format = 'HH:mm';
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles className={'text_input__wrapper'}>
                        <label className={'text_input__cont'}>
                            <div className={'text_input__label'}>{label}</div>
                            <TimePicker
                                disabled={disabled}
                                value={field.value?moment(field.value, format):null}
                                className={classes('text_input__input', form.errors[name] && form.touched[name] && 'text_input__error',)}
                                onChange={(date, dateString: string)=>{
                                    if(!date) return;
                                    form.setFieldValue(name, dateString);
                                    onUpdate && onUpdate(name, dateString);
                                }}
                                format={format}
                                onBlur={field.onBlur}/>
                        </label>
                        <FormError name={name}/>
                    </Styles>
                )
            }
        </Field>
    );
};

export default FormTimepicker;
