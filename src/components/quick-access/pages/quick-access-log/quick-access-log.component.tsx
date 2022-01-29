import React, { FC, useMemo } from 'react'

import {
  ExerciseIconV2,
  HealthDataIconV2,
  MealIconV2,
  MeasurementIconV2
} from '../../../../assets/media/icons'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import QuickAccessAction from '../../components/quick-access-action/quick-access-action.component'
import QuickAccessSelectedClient from '../../components/quick-access-selected-client/quick-access-selected-client.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import QuickAccessSelectClient from '../quick-access-select-client/quick-access-select-client.component'
import Styles from './quick-access-log.styles'

type Props = {}
const QuickAccessLog: FC<Props> = ({}) => {
  const { type } = useAuth()
  const { client } = useQuickAccess()

  const options = useMemo(
    () => [
      {
        icon: ExerciseIconV2,
        route: quickAccessRoutes.LOG_EXERCISE,
        label: 'exercise',
        color: '#E49A0A'
      },
      {
        icon: HealthDataIconV2,
        route: quickAccessRoutes.LOG_HEALTH_DATA,
        label: 'health-data',
        color: '#F123B8'
      },
      {
        icon: MealIconV2,
        route: quickAccessRoutes.LOG_MEAL,
        label: 'meal',
        color: '#00B334'
      },
      {
        icon: MeasurementIconV2,
        route: quickAccessRoutes.LOG_MEASUREMENT,
        label: 'measurement',
        color: '#000000'
      }
    ],
    [type]
  )

  if (type !== userTypes.CLIENT && !client) return <QuickAccessSelectClient />

  return (
    <Styles>
      {type !== userTypes.CLIENT ? <QuickAccessSelectedClient /> : null}
      <div className={'qa-log__actions'}>
        {options.map((option) => (
          <QuickAccessAction key={option.route} {...option} />
        ))}
      </div>
    </Styles>
  )
}

export default QuickAccessLog
