import React, {useState, useEffect} from 'react';
import Styles, {Logo, ResendEmail, Wrapper} from "../styles";
import logoCompact from "../../../assets/media/logo-compact.png";
import {useTranslation} from "../../../modules/i18n/i18n.hook";

const SignUpConfirmation = () => {
    const {t} = useTranslation();
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <h1 className={'forgot-password__title'}>{t('auth:sign-up')}</h1>
                <div className={'forgot-password__hr'}/>
                <p className={'forgot-password__desc'}>
                    <span>{t('auth:sign-up-confirm-1')}</span>
                    <span>{t('auth:sign-up-confirm-2')}</span>
                </p>
            </Wrapper>
        </Styles>
    )
};

export default SignUpConfirmation;
