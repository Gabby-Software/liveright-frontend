import React, { FC } from 'react'

import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useQuickAccess } from '../../quick-access.context'
import { QuickAccessActionType } from '../../types/quick-access-action.type'
import Styles from './quick-access-action.styles'

const QuickAccessAction: FC<QuickAccessActionType> = ({
  route,
  icon: Icon,
  label,
  color
}) => {
  const { t } = useTranslation()
  const { setRoute } = useQuickAccess()
  return (
    <Styles
      color={color}
      onClick={() => setRoute(route)}
      className={'qa-action'}
    >
      <Icon />
      <span className={'qa-action__label'}>
        {t(`quickaccess:menu.${label}`)}
      </span>
    </Styles>
  )
}

export default QuickAccessAction
