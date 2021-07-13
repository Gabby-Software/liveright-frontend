import React, {useState, useEffect} from 'react';
import Styles from './plans-mobile.styles';
import {FormSwitchUI} from "../../../components/forms/form-switch/form-switch.component";
import {OptionType} from "../../../types/option.type";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {planTypes} from "../../../enums/plan-types.enum";

type Props = {
    plan: string;
};
const PlansMobile = ({}:Props) => {
    const {t} = useTranslation();
    return (
        <Styles>
        </Styles>
    )
};

export default PlansMobile;
