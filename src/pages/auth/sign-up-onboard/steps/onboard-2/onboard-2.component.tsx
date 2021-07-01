import React, {useState, useEffect} from 'react';
import Styles from './onboard-2.styles';
import FormInputLabeled from "../../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";

const Onboard2 = () => {
    const {t} = useTranslation();
    return (
        <Styles>
            <FormInputLabeled name={'address'} label={t('profile:address')}/>
        </Styles>
    );
};

export default Onboard2;
