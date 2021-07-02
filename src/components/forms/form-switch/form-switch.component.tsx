import React, {useState, useEffect} from 'react';
import Styles from './form-switch.styles';
import {FormikProps, Field, FieldProps, ErrorMessage} from 'formik';
import {classes} from "../../../pipes/classes.pipe";
import FormError from "../form-error/form-error.component";
import {OptionType} from "../../../types/option.type";
type UIProps = {
    value: string;
    options: OptionType[];
    onUpdate?:(value:string)=>void;
}
type Props = {
    name: string;
    onUpdate?:(name:string,value:string)=>void;
    options: OptionType[];
}
export const FormSwitchUI = ({options, value,onUpdate}: UIProps) => {
  return (
      <Styles className={'switch__wrapper'}>
          <div className={'switch__cont'}>
              <div className={'switch'}>
                  <div className={'switch__activon'} style={{
                      width: `${100 / options.length}%`,
                      left: options.findIndex(o => o.value === value) * 100 / options.length + '%'
                  }}/>
                  {options.map(p => (
                      <div key={p.value}
                           className={classes('switch__item', value === p.value && 'switch__item__active')}
                           onClick={() => {
                               onUpdate && onUpdate(p.value);
                           }}><span>{p.label}</span></div>
                  ))}
              </div>
          </div>
      </Styles>
  );
};
const FormSwitch = ({name, options, onUpdate}: Props) => {
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <FormSwitchUI value={field.value} options={options} onUpdate={(v) => {
                        form.setFieldValue(name, v);
                        onUpdate && onUpdate(name, v);
                    }}/>
                )
            }
        </Field>
    )
};

export default FormSwitch;
