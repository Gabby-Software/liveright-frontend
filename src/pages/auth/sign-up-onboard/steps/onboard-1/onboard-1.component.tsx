import React from 'react'

import FormDatepicker from '../../../../../components/forms/form-datepicker/form-datepicker.component'
import FormInputLabeled from '../../../../../components/forms/form-input-labeled/form-input-labeled.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import Styles from './onboard-1.styles'

const Onboard1 = () => {
  const { t } = useTranslation()
  return (
    <Styles>
      <FormInputLabeled name={'phone_number'} label={t('profile:phone')} />
      <FormDatepicker name={'birthday'} label={t('profile:birth-date')} />
    </Styles>
  )
}

export default Onboard1
