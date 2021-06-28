import React, {useState, useEffect, useContext} from 'react';
import Styles, {Wrapper, Logo, SwitchState, Title} from '../styles';
import logoCompact from "../../../assets/media/logo-compact.png";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {useDispatch} from "react-redux";
import {AuthOnboardType} from "../../../modules/auth/auth-onboard.type";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import logger from "../../../managers/logger.manager";
import {toast} from "../../../components/toast/toast.component";
import FormInput from "../../../components/forms/form-input/form-input.component";
import FormDatepicker from "../../../components/forms/form-datepicker/form-datepicker.component";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import FormButton from "../../../components/forms/form-button/form-button.component";
import FormInputLabeled from "../../../components/forms/form-input-labeled/form-input-labeled.component";

const initialState: AuthOnboardType = {
    phone: '',
    birthday: new Date().toDateString()
};
const SignUpOnboard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (form: AuthOnboardType, submitProps: { setSubmitting: (submitting: boolean) => void }) => {
        logger.info('SIGN_UP_ONBOARD', 'submitting..', form);
        submitProps.setSubmitting(false);
        toast.show({type: 'success', msg: 'You successfully onboarded!'});
    };
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <Title>
                    <div className={'title__hr'}/>
                    <h1 className={'title__h1'}>{t('auth:sign-up-onboard-title')} {'Donatello'},</h1>
                    <h2 className={'title__h2'}>{t('auth:sign-up-onboard-desc')}</h2>
                </Title>
                <Formik initialValues={initialState}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            phone: Yup.string().phone(),
                            birthday: Yup.string()
                        })}
                >
                    {() => (
                        <Form>
                            <FormInputLabeled name={'phone'} label={t('profile:phone')}/>
                            <FormDatepicker name={'birthday'} label={t('profile:birth-date')}/>
                            <ButtonSubmit>{t('finish')}</ButtonSubmit>
                            <FormButton className={'sign-up__skip'} type={'link'}>{t('skip')}</FormButton>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </Styles>
    )
};

export default SignUpOnboard;
