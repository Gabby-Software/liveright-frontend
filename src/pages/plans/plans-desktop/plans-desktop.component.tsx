import React from 'react'

import { planTypes } from '../../../enums/plan-types.enum'
import MealPlansDesktop from './meal-plans-desktop/meal-plans-desktop.component'
import Styles from './plans-desktop.styles'
import TrainingSplitsDesktop from './training-splits-desktop/training-splits-desktop.component'
import WorkoutPlansDesktop from './workout-plans-desktop/workout-plans-desktop.component'

const PlansDesktop = ({ plan }: { plan: string }) => {
  return (
    <Styles>
      {plan === planTypes.TRAINING_SPLIT ? (
        <TrainingSplitsDesktop />
      ) : plan === planTypes.DIET_PLAN ? (
        <MealPlansDesktop />
      ) : plan === planTypes.WORKOUT_PLAN ? (
        <WorkoutPlansDesktop />
      ) : null}
    </Styles>
  )
}

export default PlansDesktop
