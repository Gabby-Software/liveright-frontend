import { Tabs } from 'antd'
import React, { FC } from 'react'

import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import QuickAccessChat from '../../quick-access-chat/quick-access-chat.component'
import QuickAccessAdd from '../quick-access-add/quick-access-add.component'
import QuickAccessLog from '../quick-access-log/quick-access-log.component'
import Styles, { StyledTabs } from './quick-access-home.styles'

type Props = {}
const QuickAccessHome: FC<Props> = ({}) => {
  const { route, setRoute } = useQuickAccess()
  const { t } = useTranslation()
  const { type } = useAuth()
  return (
    <Styles>
      <StyledTabs
        defaultActiveKey={String(route)}
        onChange={(r) => setRoute(+r)}
      >
        <Tabs.TabPane tab={t('quickaccess:log')} key={quickAccessRoutes.LOG}>
          <QuickAccessLog />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('quickaccess:add')} key={quickAccessRoutes.ADD}>
          <QuickAccessAdd />
        </Tabs.TabPane>
      </StyledTabs>
      {type === userTypes.CLIENT ? <QuickAccessChat /> : null}
    </Styles>
  )
}

export default QuickAccessHome
