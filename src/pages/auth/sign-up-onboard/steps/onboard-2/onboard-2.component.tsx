import React from 'react'

import FormCountrySelect from '../../../../../components/forms/form-country-select/form-country-select.component'
import FormInputLabeled from '../../../../../components/forms/form-input-labeled/form-input-labeled.component'
import FormRow from '../../../../../components/forms/form-row/form-row.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import Styles from './onboard-2.styles'

const Onboard2 = () => {
  const { t } = useTranslation()
  return (
    <Styles>
      <FormInputLabeled name={'address'} label={t('profile:address')} />
      <FormRow>
        <FormInputLabeled name={'city'} label={t('profile:city')} />
        <FormCountrySelect />
      </FormRow>
    </Styles>
  )
}

export default Onboard2
