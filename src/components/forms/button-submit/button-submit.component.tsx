import React, {useState, useEffect} from 'react';
import Styles from './button-submit.styles';
import FormButton from "../form-button/form-button.component";
import {Field, FieldProps, useFormik} from "formik";
import {classes} from "../../../pipes/classes.pipe";

export type SubmitProps = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};
const ButtonSubmit = ({children, className, id}: SubmitProps) => {
    return (
        <Field name={''}>
            {
                ({form}: FieldProps) => (
                    <FormButton
                        className={classes('button-submit', className)}
                        id={id}
                        type={'primary'}
                        loading={form.isSubmitting}
                        htmlType={'submit'}
                        disabled={
                            // !form.isValid
                            // || !dirty
                            // ||
                            form.isSubmitting}
                    >{children}</FormButton>
                )}
        </Field>
    );
};

export default ButtonSubmit;
