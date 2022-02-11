import React, { FC, useMemo } from 'react'

import {
  ExerciseIconV2,
  FoodIconV2,
  MealIconV2,
  WorkoutIconV2
} from '../../../../assets/media/icons'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import QuickAccessAction from '../../components/quick-access-action/quick-access-action.component'
import { quickAccessRoutes } from '../../quick-access.routes'
import { QuickAccessActionType } from '../../types/quick-access-action.type'
import Styles from './quick-access-add.styles'

type Props = {}
const QuickAccessAdd: FC<Props> = ({}) => {
  const { type } = useAuth()
  const options = useMemo(() => {
    const trainerOptions: QuickAccessActionType[] = []
    const clientOptions: QuickAccessActionType[] = [
      {
        icon: ExerciseIconV2,
        route: quickAccessRoutes.ADD_EXERCISE,
        label: 'exercise',
        color: '#D70004'
      },
      {
        icon: WorkoutIconV2,
        route: quickAccessRoutes.ADD_WORKOUT,
        label: 'workout',
        color: '#E49A0A'
      },
      {
        icon: FoodIconV2,
        route: quickAccessRoutes.ADD_FOOD,
        label: 'food',
        color: '#D77200'
      },
      {
        icon: MealIconV2,
        route: quickAccessRoutes.ADD_MEAL,
        label: 'meal',
        color: '#00B334'
      }
    ]
    return type === userTypes.CLIENT ? clientOptions : trainerOptions
  }, [type])
  return (
    <Styles>
      <div className={'qa-add__actions'}>
        {options.map((option) => (
          <QuickAccessAction key={option.route} {...option} />
        ))}
      </div>
    </Styles>
  )
}

export default QuickAccessAdd
