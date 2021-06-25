import React, {useState, useEffect, useContext} from 'react';
import Styles, {Wrapper, Logo, SwitchState, ForgetPassword} from '../styles';
import logoCompact from "../../../assets/media/logo-compact.png";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {Form, Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import FormInputLabeled from "../../../components/forms/form-input-labeled/form-input-labeled.component";
import {AuthFormType, AuthFormTypeNotNull} from "../../../modules/auth/auth-form.type";
import {AuthFormContext} from "../../../modules/auth/auth.context";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import {Redirect} from "react-router";

type PasswordType = {
    new_password: string;
    confirm_new_password: string;
}
const ResetPassword = () => {
    const {t} = useTranslation();
    const {form} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const [submitted, setSubmitted] = useState<boolean>(false);
    const handleSubmit = (form: PasswordType, submitProps: {setSubmitting:(submitting: boolean) => void}) => {
        console.log(form);
        alert(`submitted!\n${JSON.stringify(form)}`);
        submitProps.setSubmitting(false);
        setSubmitted(true);
    };
    if(submitted) return <Redirect to={'/'}/>;
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <h1 className={'forgot-password__title'}>{t('auth:recover-password')}</h1>
                <div className={'forgot-password__hr'}/>
                <h2 className={'forgot-password__desc'}/>
                <Formik initialValues={form}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            new_password: Yup.string().required(),
                            confirm_new_password: Yup.string().required().equals([Yup.ref('new_password')], 'passwords-not-match')
                        })}
                >
                    {(form: FormikProps<PasswordType>) => (
                        <Form>
                            <FormInputLabeled type={'password'} name={'new_password'} label={t('auth:new-password')}/>
                            <FormInputLabeled type={'password'} name={'confirm_new_password'} label={t('auth:confirm-password')}/>
                            <ButtonSubmit {...form}>{t('auth:change-password')}</ButtonSubmit>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </Styles>
    );
};

export default ResetPassword;
