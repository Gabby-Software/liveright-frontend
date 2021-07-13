import React, {useState, useEffect} from 'react';
import Styles from './plans-mobile.styles';
import {FormSwitchUI} from "../../../components/forms/form-switch/form-switch.component";
import {OptionType} from "../../../types/option.type";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {planTypes} from "../../../enums/plan-types.enum";

type Props = {};
const PlansMobile = ({}:Props) => {
    const {t} = useTranslation();
    const [plan, setPlan] = useState(planTypes.TRAINING_SPLIT);
    const dataOptions: OptionType[] = [
        {label: t('plans:training-split'), value: planTypes.TRAINING_SPLIT},
        {label: t('plans:diet-plan'), value: planTypes.DIET_PLAN},
        {label: t('plans:workout-plan'), value: planTypes.WORKOUT_PLAN},
    ];
    return (
        <Styles>
            <FormSwitchUI value={plan} options={dataOptions} onUpdate={setPlan}/>
        </Styles>
    )
};

export default PlansMobile;
