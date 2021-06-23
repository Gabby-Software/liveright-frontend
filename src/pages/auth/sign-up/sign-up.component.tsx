import React, {useState, useEffect} from 'react';
import userTypes from "../../../enums/user-types.enum";
import * as Yup from 'yup';
import {
    Formik,
    FormikProps,
    Form,
} from 'formik';
import FormSwitch from "../../../components/forms/form-switch/form-switch.component";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import FormInput from "../../../components/forms/form-input/form-input.component";
import logoCompact from '../../../assets/media/logo-compact.png';
import {Link} from 'react-router-dom';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import Styles, {Wrapper, Logo, SwitchState} from '../styles';

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
    const {t} = useTranslation();
    const handleSubmit = (form: LoginDataType, submitProps: {setSubmitting:(submitting: boolean) => void}) => {
        console.log(form);
        alert(`submitted!\n${JSON.stringify(form)}`);
        submitProps.setSubmitting(false);
    };
    const userTypeOptions = [
        {label: 'Client', value: userTypes.CLIENT},
        {label: 'Trainer', value: userTypes.TRAINER},
    ];
    return (
            <Styles>
                <Wrapper>
                    <Logo alt={'liveright'} src={logoCompact}/>
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
                                <ButtonSubmit {...form}>{t('auth:sign-up')}</ButtonSubmit>
                            </Form>
                        )}
                    </Formik>
                {/*<Link className={'signup__forget-password'} to={'/forget-password'}>{t('auth:forgot-password')}</Link>*/}
                <SwitchState>
                    {t('auth:have-account')} <Link to={'/login'}>{t('auth:sign-in')}</Link>
                </SwitchState>
                </Wrapper>
            </Styles>
    );
};

export default SignUp;