import React from 'react'

import { CalendarIcon } from '../../../../../assets/media/icons'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import Styles from './add-session-calendar-empty.styles'

type Props = {}
const AddSessionCalendarEmpty = ({}: Props) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <CalendarIcon className={'add-session__empty__icon'} />
      <p className={'add-session__empty__desc'}>
        {t('sessions:calendar-empty')}
      </p>
    </Styles>
  )
}

export default AddSessionCalendarEmpty
