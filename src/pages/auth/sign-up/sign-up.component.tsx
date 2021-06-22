import React, {useState, useEffect} from 'react';
import {
    Modal, Button, Form as AntForm,
    Radio, Input, Typography
} from 'antd';
import Styles from './sign-up.styles';
import userTypes from "../../../enums/user-types.enum";
import * as Yup from 'yup';
import {
    useFormik,
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    ErrorMessage
} from 'formik';
import FormSwitch from "../../../components/forms/form-switch/form-switch.component";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import FormInput from "../../../components/forms/form-input/form-input.component";

type LayoutType = Parameters<typeof AntForm>[0]['layout'];

type LoginDataType = {
    type: string;
    name: string;
    email: string;
    password: string;
};
const initialValues: LoginDataType = {
    type: userTypes.CLIENT,
    name: '',
    email: '',
    password: ''
};
const SignUp = () => {
    const handleSubmit = (form: LoginDataType, submitProps: {setSubmitting:(submitting: boolean) => void}) => {
        console.log(form)
        alert(`submitted!\n${JSON.stringify(form)}`);
        submitProps.setSubmitting(false);
    };
    const userTypeOptions = [
        {label: 'Client', value: userTypes.CLIENT},
        {label: 'Trainer', value: userTypes.TRAINER},
    ];
    return (
        <Modal visible footer={null} closeIcon={<div/>}>
            <Styles>
                <Typography.Title className={'center'}>Create an account</Typography.Title>
                    <Formik initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={Yup.object({
                                type: Yup.string().required(),
                                name: Yup.string().required(),
                                email: Yup.string().required().email(),
                                password: Yup.string().required()
                            })}
                    >
                        {(form: FormikProps<LoginDataType>) => (
                            <Form>
                                <FormSwitch name={'type'} options={userTypeOptions}/>
                                <FormInput name={'name'} label={'Name'}/>
                                <FormInput name={'email'} label={'Email'}/>
                                <FormInput type={'password'} name={'password'} label={'Password'}/>
                                <ButtonSubmit {...form}>Sign Up</ButtonSubmit>
                            </Form>
                        )}
                    </Formik>
            </Styles>
        </Modal>
    );
};

export default SignUp;
