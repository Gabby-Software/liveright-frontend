import { ComponentType } from 'react'

import { ReactComponent as InvoiceIcon } from '../../../../assets/media/icons/invoice-action.svg'
import { ReactComponent as MealIcon } from '../../../../assets/media/icons/meal-action.svg'
import { ReactComponent as SessionIcon } from '../../../../assets/media/icons/session-action.svg'
import { ReactComponent as WorkoutIcon } from '../../../../assets/media/icons/workout-action.svg'

export const notificationIconMap: { [key: string]: ComponentType<any> } = {
  session: SessionIcon,
  invoice: InvoiceIcon,
  meal: MealIcon,
  exercise: WorkoutIcon
}
