import React, {useState, useEffect} from 'react';
import Styles from './button-submit.styles';
import FormButton from "../form-button/form-button.component";
import {Field, FieldProps, useFormik} from "formik";
import {classes} from "../../../pipes/classes.pipe";

export type SubmitProps = {
    isSubmitting?: boolean;
    isValid?: boolean;
    dirty?: boolean;
    children: React.ReactNode;
    className?: string;
};
const ButtonSubmit = ({children, className}: SubmitProps) => {
    return (
        <Field name={''}>
            {
                ({field, form}: FieldProps) => (
                    <FormButton
                        className={classes('button-submit', className)}
                        type={'primary'}
                        loading={form.isSubmitting}
                        htmlType={'submit'}
                        disabled={
                            !form.isValid
                            // || !dirty
                            || form.isSubmitting}
                    >{children}</FormButton>
                )}
        </Field>
    );
};

export default ButtonSubmit;
