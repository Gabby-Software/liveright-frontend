import React, { FC } from 'react'

import { ReactComponent as BackArrow } from '../../../../assets/media/icons/left-arrow.svg'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-back.styles'

type Props = {
  label: string
  route: quickAccessRoutes
  color?: string
}
const QuickAccessBack: FC<Props> = ({ label, color, route }) => {
  const { t } = useTranslation()
  const { setRoute } = useQuickAccess()
  return (
    <Styles color={color} onClick={() => setRoute(route)}>
      <BackArrow />
      <span>Back to {t(`quickaccess:menu.${label}`)}</span>
    </Styles>
  )
}

export default QuickAccessBack
