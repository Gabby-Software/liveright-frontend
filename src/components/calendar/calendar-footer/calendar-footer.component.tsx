import React from 'react'

import { ReactComponent as AddIcon } from '../../../assets/media/icons/add.svg'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Styles from './calendar-footer.styles'

const CalendarFooter = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  if (!isMobile) return null
  return (
    <Styles>
      <span className={'calendar-footer__title'}>{t('calendar:today')}</span>
      <AddIcon className={'calendar-footer__add'} />
    </Styles>
  )
}

export default CalendarFooter
