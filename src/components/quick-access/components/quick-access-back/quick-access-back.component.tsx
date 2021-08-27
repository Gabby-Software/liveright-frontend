import React, { FC } from 'react'

import { ReactComponent as BackArrow } from '../../../../assets/media/icons/left-arrow.svg'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-back.styles'

type Props = {
  label: string
  route: quickAccessRoutes
}
const QuickAccessBack: FC<Props> = ({ label, route }) => {
  const { t } = useTranslation()
  const { setRoute } = useQuickAccess()
  return (
    <Styles onClick={() => setRoute(route)}>
      <BackArrow />
      <span>Back to {t(`quickaccess:menu.${label}`).toLowerCase()}</span>
    </Styles>
  )
}

export default QuickAccessBack
