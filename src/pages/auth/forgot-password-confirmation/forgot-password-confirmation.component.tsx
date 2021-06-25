import React, {useState, useEffect} from 'react';
import Styles, {Logo, Wrapper, ResendEmail} from "../styles";
import logoCompact from "../../../assets/media/logo-compact.png";
import {useTranslation} from "../../../modules/i18n/i18n.hook";

const ForgotPasswordConfirmation = () => {
    const {t} = useTranslation();
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
                    <a onClick={() => alert('resend email')}>{t('auth:send-again')}</a>
                </ResendEmail>
            </Wrapper>
        </Styles>
    )
};

export default ForgotPasswordConfirmation;
