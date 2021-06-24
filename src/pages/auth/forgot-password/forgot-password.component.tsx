import React, {useState, useEffect, useContext} from 'react';
import Styles, {Wrapper, Logo, SwitchState,ForgetPassword} from '../styles';
import logoCompact from "../../../assets/media/logo-compact.png";
import {Form, Formik, FormikProps} from "formik";
import FormInput from "../../../components/forms/form-input/form-input.component";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {AuthFormContext} from "../../../modules/auth/auth.context";
import {AuthFormTypeNotNull} from "../../../modules/auth/auth-form.type";
import * as Yup from 'yup';

type EmailType = {email:string};
const ForgotPassword = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const handleSubmit = (form: EmailType, submitProps: {setSubmitting:(submitting: boolean) => void}) => {
        console.log(form);
        alert(`submitted!\n${JSON.stringify(form)}`);
        submitProps.setSubmitting(false);
    };
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <h1 className={'forgot-password__title'}>{t('auth:recover-password')}</h1>
                <p className={'forgot-password__desc'}>{t('auth:recover-password-desc')}</p>
                <Formik initialValues={form}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            email: Yup.string().required().email(),
                        })}
                >
                    {(form: FormikProps<EmailType>) => (
                        <Form>
                            <FormInput name={'email'} label={'Email'} onUpdate={update}/>
                            <ButtonSubmit {...form}>{t('next')}</ButtonSubmit>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </Styles>
    );
};

export default ForgotPassword;
