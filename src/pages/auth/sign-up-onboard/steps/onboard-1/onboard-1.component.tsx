import React, {useState, useEffect} from 'react';
import Styles from './onboard-1.styles';
import logger from "../../../../../managers/logger.manager";
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import ButtonSubmit from "../../../../../components/forms/button-submit/button-submit.component";
import FormDatepicker from "../../../../../components/forms/form-datepicker/form-datepicker.component";
import FormInputLabeled from "../../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";


const Onboard1 = () => {
    const {t} = useTranslation();
    return (
        <Styles>
            <FormInputLabeled name={'phone'} label={t('profile:phone')}/>
            <FormDatepicker name={'birthday'} label={t('profile:birth-date')}/>
        </Styles>
    )
};

export default Onboard1;
