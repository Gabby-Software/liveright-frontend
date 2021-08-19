import React from 'react'

import { ReactComponent as LikeIcon } from '../../../../../assets/media/icons/like.svg'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import Styles from './add-session-calendar-empty.styles'

type Props = {}
const AddSessionCalendarEmpty = ({}: Props) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <LikeIcon className={'add-session__empty__icon'} />
      <p className={'add-session__empty__desc'}>
        {t('sessions:calendar-empty')}
      </p>
    </Styles>
  )
}

export default AddSessionCalendarEmpty
