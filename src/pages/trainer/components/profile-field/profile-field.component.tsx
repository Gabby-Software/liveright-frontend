import React from 'react'

import FormRow from '../../../../components/forms/form-row/form-row.component'
import { useTrainer } from '../../../../hooks/trainer.hook'
import logger from '../../../../managers/logger.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { date } from '../../../../pipes/date.pipe'
import { OnBoardItemType } from '../../trainer.data'
import Styles from './profile-field.styles'

const ProfileField = ({ name, label, data, type }: OnBoardItemType) => {
  const { t } = useTranslation()
  const trainer = useTrainer()
  logger.info('PROFILE', trainer)
  if (type === 'row')
    return (
      <FormRow className={'row'}>
        {data?.map((d) => (
          // eslint-disable-next-line react/jsx-key
          <ProfileField {...d} />
        ))}
      </FormRow>
    )
  // if(!(trainer as any)[name as string]) return null;
  return (
    <Styles>
      <div className={'field__name'}>{t(label || '')}</div>
      <div className={'field__value'}>
        {type === 'radio'
          ? t(`profile:${(trainer as any)[name as string]}`)
          : type === 'country-select'
          ? trainer.country?.name_english
          : type === 'date'
          ? date((trainer as any)[name as string])
          : (trainer as any)[name as string]}
      </div>
    </Styles>
  )
}

export default ProfileField
