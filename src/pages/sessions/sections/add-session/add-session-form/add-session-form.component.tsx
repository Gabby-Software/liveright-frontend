import React, {useState, useEffect, useMemo} from 'react';
import Styles from './add-session-form.styles';
import {Form, Formik, FormikHelpers} from "formik";
import moment from "moment";
import * as Yup from 'yup';

export type AddSessionFormType = {
    "type": string,
    "date": string,
    "duration": string,
    "time": string,
    "notes": string,
    "client_id": number,
    sessions: number
}
type Props = {
    children:React.ReactNode,
    onClose: () =>void,
    initialValues?: AddSessionFormType;
};
const initialValuesEmpty: AddSessionFormType = {
    type: '',
    date: '',
    duration: '',
    time: '',
    notes: '',
    client_id: 0,
    sessions: 0
};

const AddSessionForm = ({children, onClose, initialValues=initialValuesEmpty}:Props) => {
    const handleSubmit = (values: AddSessionFormType, helper: FormikHelpers<AddSessionFormType>) => {
        helper.setSubmitting(false);
        helper.resetForm();
        onClose();
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                type: Yup.string().required(),
                date: Yup.date().required().min(moment().startOf('day')),
                duration: Yup.string().required(),
                time: Yup.string().required(),
                client_id: Yup.number()
            })}
        >
            <Form>
                {children}
            </Form>
        </Formik>
    )
};

export default AddSessionForm;