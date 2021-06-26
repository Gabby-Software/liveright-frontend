import React, {useState, useEffect} from 'react';
import FormButton from "../form-button/form-button.component";
import {Field, FieldProps, useFormik} from "formik";
import {classes} from "../../../pipes/classes.pipe";

export type CancelProps = {
    children: React.ReactNode;
    className?: string;
    onCancel?:() => void;
};
const ButtonCancel = ({children, className, onCancel}: CancelProps) => {
    return (
        <Field name={''}>
            {
                ({field, form}: FieldProps) => (
                    <FormButton
                        className={classes('button-submit', className)}
                        type={'default'}
                        disabled={form.isSubmitting}
                        onClick={() => {
                            form.resetForm();
                            onCancel && onCancel();
                        }}
                    >{children}</FormButton>
                )}
        </Field>
    );
};

export default ButtonCancel;
