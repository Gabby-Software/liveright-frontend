import React, {useState, useEffect} from 'react';
import Styles from './onboard-3.styles';
import FormTextarea from "../../../../../components/forms/form-textarea/form-textarea.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";

const Onboard3 = () => {
    const {t} = useTranslation();
    return (
        <Styles>
            <FormTextarea name={'dietary_restrictions'} label={t('profile:dietary-restrictions')}/>
            <FormTextarea name={'injuries'} label={t('profile:injuries')}/>
        </Styles>
    );
};

export default Onboard3;
