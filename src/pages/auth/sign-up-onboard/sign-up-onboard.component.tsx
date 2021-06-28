import React, {useState, useEffect, useContext} from 'react';
import Styles, {Wrapper, Logo, SwitchState, Title} from '../styles';
import logoCompact from "../../../assets/media/logo-compact.png";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {useDispatch} from "react-redux";
import {AuthOnboardType} from "../../../modules/auth/auth-onboard.type";
import {Formik} from "formik";
import * as Yup from "yup";
import logger from "../../../managers/logger.manager";
import {toast} from "../../../components/toast/toast.component";

const initialState: AuthOnboardType = {
    phone: '',
    birthday: ''
};
const SignUpOnboard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (form: AuthOnboardType, submitProps: {setSubmitting:(submitting: boolean) => void}) => {
        logger.info('SIGN_UP_ONBOARD', 'submitting..', form);
        submitProps.setSubmitting(false);
        toast.show({type: 'success', msg: ''});
    };
    return (
        <Styles>
            <Logo alt={'liveright'} src={logoCompact}/>
            <Title>
                <div className={'title__hr'}/>
                <h1 className={'title__h1'}>{t('auth:sign-up-title')} {'Donatello'},</h1>
                <h2 className={'title__h2'}>{t('auth:sign-up-subtitle')}</h2>
            </Title>
            <Formik initialValues={initialState}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        phone: Yup.string().phone(),
                        birthday: Yup.string()
                    })}
            >
            </Formik>

        </Styles>
    )
};

export default SignUpOnboard;
