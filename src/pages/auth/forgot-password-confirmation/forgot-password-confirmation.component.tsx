import React, {useState, useEffect, useContext} from 'react';
import Styles, {Logo, Wrapper, ResendEmail} from "../styles";
import logoCompact from "../../../assets/media/logo-compact.png";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {AuthFormContext} from "../../../modules/auth/auth.context";
import {AuthFormTypeNotNull} from "../../../modules/auth/auth-form.type";
import {Redirect} from "react-router";
import {Routes} from "../../../enums/routes.enum";
import {useDispatch} from "react-redux";
import {ACTION_RESET_PASSWORD_REQUEST} from "../../../store/action-types";
import {onlyGuest} from "../../../guards/guest.guard";
import Back from "../styles/back/back.component";

const ForgotPasswordConfirmation = () => {
    const {t} = useTranslation();
    const {form} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const dispatch = useDispatch();
    if(!form.email)
        return <Redirect to={Routes.LOGIN}/>;
    const resendEmail = () => {
        dispatch({type: ACTION_RESET_PASSWORD_REQUEST,payload: {email: form.email}});
    };
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <h1 className={'forgot-password__title'}>{t('auth:recover-password')}</h1>
                <div className={'forgot-password__hr'}/>
                <p className={'forgot-password__desc'}>
                    <span>{t('auth:recover-password-confirm-1')}</span>
                    <span>{t('auth:recover-password-confirm-2')}</span>
                </p>
                <ResendEmail>
                    <span>{t('auth:not-received')}</span>
                    <a onClick={resendEmail}>{t('auth:send-again')}</a>
                </ResendEmail>
            </Wrapper>
            {/*<Back to={Routes.LOGIN}/>*/}
        </Styles>
    )
};

export default onlyGuest(ForgotPasswordConfirmation);
