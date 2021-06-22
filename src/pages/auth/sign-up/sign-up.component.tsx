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
                        {({setSubmitting,values, isSubmitting, errors, setFieldValue, handleBlur, isValid, dirty, submitForm}: FormikProps<LoginDataType>) => (
                            <Form
                                // onSubmit={e => {e.preventDefault(); handleSubmit(values,{setSubmitting})}}
                            >
                                <FormSwitch name={'type'}
                                            options={[
                                                {label: 'Client', value: userTypes.CLIENT},
                                                {label: 'Trainer', value: userTypes.TRAINER},
                                            ]}
                                />

                                {/*<AntForm.Item name="type">*/}
                                {/*    <div className={'center'}>*/}
                                {/*        <Radio.Group value={values.type} name={'type'}>*/}
                                {/*            <Radio.Button value={userTypes.CLIENT}*/}
                                {/*                          onChange={e => setFieldValue('type', e.target.value)}>Client</Radio.Button>*/}
                                {/*            <Radio.Button value={userTypes.TRAINER}*/}
                                {/*                          onChange={e => setFieldValue('type', e.target.value)}>Trainer</Radio.Button>*/}
                                {/*        </Radio.Group>*/}
                                {/*    </div>*/}
                                {/*</AntForm.Item>*/}
                                <AntForm.Item label="Name">
                                    <div>
                                        <Input placeholder="your full name" name={'name'} value={values.name}
                                               onBlur={handleBlur}
                                               onChange={e => setFieldValue('name', e.target.value)}/>
                                    </div>
                                </AntForm.Item>
                                <AntForm.Item label="Email">
                                    <div>
                                        <Input placeholder="example@gmail.com" name={'email'} value={values.email}
                                               onBlur={handleBlur}
                                               onChange={e => setFieldValue('email', e.target.value)}/>
                                    </div>
                                </AntForm.Item>
                                <AntForm.Item label="Password">
                                    <div>
                                        <Input type={'password'} name={'password'} value={values.password}
                                               onBlur={handleBlur}
                                               onChange={e => setFieldValue('password', e.target.value)}/>
                                    </div>
                                </AntForm.Item>
                                <div className={'center'}>
                                    <Button type={'primary'}
                                            loading={isSubmitting}
                                            // onClick={submitForm}
                                            htmlType={'submit'}
                                            disabled={!isValid || !dirty || isSubmitting}
                                    >{'Sign Up'}</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
            </Styles>
        </Modal>
    );
};

export default SignUp;
