import React, { useState } from 'react'

import { FormSwitchUI } from '../../components/forms/form-switch/form-switch.component'
import { planTypes } from '../../enums/plan-types.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { OptionType } from '../../types/option.type'
import Styles from './plans.styles'
import PlansDesktop from './plans-desktop/plans-desktop.component'
import PlansMobile from './plans-mobile/plans-mobile.component'

const Plans = () => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const [plan, setPlan] = useState(planTypes.TRAINING_SPLIT)
  const dataOptions: OptionType[] = [
    { label: t('plans:training-split'), value: planTypes.TRAINING_SPLIT },
    { label: t('plans:diet-plan'), value: planTypes.DIET_PLAN },
    { label: t('plans:workout-plan'), value: planTypes.WORKOUT_PLAN }
  ]
  return (
    <Styles>
      <div className={'plans__filters'}>
        <FormSwitchUI value={plan} options={dataOptions} onUpdate={setPlan} />
      </div>
      {isMobile ? <PlansMobile plan={plan} /> : <PlansDesktop plan={plan} />}
    </Styles>
  )
}

export default Plans
