import React, {useState, useEffect} from 'react';
import Styles from './plans-desktop.styles';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {planTypes} from "../../../enums/plan-types.enum";
import {OptionType} from "../../../types/option.type";
import {FormSwitchUI} from "../../../components/forms/form-switch/form-switch.component";
import TrainingSplitsDesktop from "./training-splits-desktop/training-splits-desktop.component";
import MealPlansDesktop from "./meal-plans-desktop/meal-plans-desktop.component";
import WorkoutPlansDesktop from "./workout-plans-desktop/workout-plans-desktop.component";

const PlansDesktop = ({plan}: {plan:string}) => {
    return (
        <Styles>
            {
                plan === planTypes.TRAINING_SPLIT ? (
                    <TrainingSplitsDesktop/>
                ) : plan === planTypes.DIET_PLAN ? (
                    <MealPlansDesktop/>
                ) : plan === planTypes.WORKOUT_PLAN ? (
                    <WorkoutPlansDesktop/>
                ) : null
            }
        </Styles>
    )
};

export default PlansDesktop;
