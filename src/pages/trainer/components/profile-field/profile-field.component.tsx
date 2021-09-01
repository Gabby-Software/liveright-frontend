import React from 'react'

import FormRow from '../../../../components/forms/form-row/form-row.component'
import useTrainerAccount from '../../../../hooks/api/accounts/useTrainerAccount'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { date } from '../../../../pipes/date.pipe'
import { OnBoardItemType } from '../../trainer.data'
import Styles from './profile-field.styles'

const ProfileField = ({ name, label, data, type }: OnBoardItemType) => {
  const { t } = useTranslation()
  const { user, profile, address } = useTrainerAccount()

  if (type === 'row') {
    return (
      <FormRow className={'row'}>
        {data?.map((d, index) => (
          <ProfileField key={index} {...d} />
        ))}
      </FormRow>
    )
  }

  return (
    <Styles>
      <div className={'field__name'}>{t(label || '')}</div>
      <div className={'field__value'}>
        {[
          'phone_number',
          'about',
          'qualifications',
          'additional_info'
        ].includes(name as string)
          ? (profile as any)[name as string]
          : ['address', 'postal_code', 'country'].includes(name as string)
          ? type === 'country-select'
            ? (address as any).country?.name_english
            : (address as any)[name as string]
          : type === 'radio'
          ? t(`profile:${(user as any)[name as string]}`)
          : type === 'date'
          ? date((user as any)[name as string])
          : (user as any)[name as string]}
      </div>
    </Styles>
  )
}

export default ProfileField
