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
import FormInputLabeled from "../../../components/forms/form-input-labeled/form-input-labeled.component";
import {Redirect} from "react-router";
import {Routes} from "../../../enums/routes.enum";
import {useDispatch} from "react-redux";
import {ACTION_RESET_PASSWORD_REQUEST} from "../../../store/action-types";

type EmailType = {email:string};
const ForgotPassword = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = ({email}: EmailType, submitProps: {setSubmitting:(submitting: boolean) => void}) => {
        dispatch({type: ACTION_RESET_PASSWORD_REQUEST, payload: {
                email,
                onSuccess: () => {
                    submitProps.setSubmitting(false);
                    setSubmitted(true);
                }
            }});
    };
    if(submitted) return <Redirect to={Routes.FORGOT_PASSWORD_CONFIRMATION}/>;
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <h1 className={'forgot-password__title'}>{t('auth:recover-password')}</h1>
                <div className={'forgot-password__hr'}/>
                <p className={'forgot-password__desc'}>
                    <span>{t('auth:recover-password-desc-1')}
                    <b>{t('auth:recover-password-desc-2')}</b>
                        {t('auth:recover-password-desc-3')}</span>
                    <span>{t('auth:recover-password-desc-4')}</span>
                </p>
                <Formik initialValues={form}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            email: Yup.string().required().email(),
                        })}
                >
                    {(form: FormikProps<EmailType>) => (
                        <Form>
                            <FormInputLabeled name={'email'} label={'Email'} onUpdate={update}/>
                            <ButtonSubmit {...form}>{t('next')}</ButtonSubmit>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </Styles>
    );
};

export default ForgotPassword;
