import React from 'react'

import { planTypes } from '../../../enums/plan-types.enum'
import MealPlansMobile from './meal-plans-mobile/meal-plans-mobile.component'
import Styles from './plans-mobile.styles'
import TrainingSplitsMobile from './training-splits-mobile/training-splits-mobile.component'
import WorkoutPlansMobile from './workout-plans-mobile/workout-plans-mobile.component'

type Props = {
  plan: string
}
const PlansMobile = ({ plan }: Props) => {
  return (
    <Styles>
      {plan === planTypes.TRAINING_SPLIT ? (
        <TrainingSplitsMobile />
      ) : plan === planTypes.DIET_PLAN ? (
        <MealPlansMobile />
      ) : plan === planTypes.WORKOUT_PLAN ? (
        <WorkoutPlansMobile />
      ) : null}
    </Styles>
  )
}

export default PlansMobile
