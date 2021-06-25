import React, {useState, useEffect, useContext} from 'react';
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
import Styles, {Wrapper, Logo, SwitchState,ForgetPassword, Title} from '../styles';
import {AuthFormContext} from "../../../modules/auth/auth.context";
import {AuthFormTypeNotNull} from "../../../modules/auth/auth-form.type";
import FormInputLabeled from "../../../components/forms/form-input-labeled/form-input-labeled.component";
import {Routes} from "../../../enums/routes.enum";

type LoginDataType = {
    type: string;
    email: string;
    password: string;
};
const Login = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
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
                <Title>
                    <div className={'title__hr'}/>
                    <h1 className={'title__h1'}>{t('auth:sign-in-title')}</h1>
                    <h2 className={'title__h2'}>{t('auth:sign-in-subtitle')}</h2>
                </Title>
                <Formik initialValues={form}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            type: Yup.string().required(),
                            email: Yup.string().required().email(),
                            password: Yup.string().required()
                        })}
                >
                    {(form: FormikProps<LoginDataType>) => (
                        <Form>
                            <FormSwitch name={'type'} options={userTypeOptions} onUpdate={update}/>
                            <FormInputLabeled name={'email'} label={'Email'} onUpdate={update}/>
                            <FormInputLabeled type={'password'} name={'password'} label={'Password'} onUpdate={update}/>
                            <ForgetPassword className={'desktop'} to={'/forgot-password'}>{t('auth:forgot-password')}</ForgetPassword>
                            <ButtonSubmit {...form}>{t('auth:sign-in')}</ButtonSubmit>
                        </Form>
                    )}
                </Formik>
                <ForgetPassword className={'mobile'} to={'/forgot-password'}>{t('auth:forgot-password')}</ForgetPassword>
                <SwitchState>
                    {t('auth:dont-have-account')} <Link to={Routes.REGISTER}>{t('auth:sign-up')}</Link>
                </SwitchState>
            </Wrapper>
        </Styles>
    );
};

export default Login;
