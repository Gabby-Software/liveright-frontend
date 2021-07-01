import React, {useState, useEffect} from 'react';
import {ArrowLink, TextLink} from './back.styles';
import {ReactComponent as BackIcon} from "../../../../assets/media/icons/back-arrow.svg";
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {Link} from "react-router-dom";

const Back = ({to}: {to: string}) => {
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    if(isMobile){
        return (
            <ArrowLink to={to}>
                <BackIcon/>
            </ArrowLink>
        )
    }
    return (
        <TextLink>
            <div>{t('auth:back-login')} <Link to={to} className={'primary'}>{t('auth:sign-in')}</Link></div>
        </TextLink>
    )
};

export default Back;
