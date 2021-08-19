import { Tabs as AntdTabs } from 'antd'
import { TabsPosition } from 'antd/es/tabs'
import React, { ReactElement } from 'react'

import { LabelWrapper } from './tabs.styles'

interface Props {
  className?: string
  tabPosition?: TabsPosition
  activeKey?: string
  onChange?: (key: string) => void
  tabs: {
    icon?: ReactElement
    key?: string
    label?: string
    renderContent: () => ReactElement
  }[]
}

const Tabs: React.FC<Props> = (props) => {
  const { tabs, tabPosition, activeKey, onChange, className } = props

  return (
    <AntdTabs
      className={className}
      tabPosition={tabPosition}
      activeKey={activeKey}
      onChange={onChange}
    >
      {tabs.map(({ label, icon, key, renderContent }) => {
        const tab = icon ? (
          <LabelWrapper className="tabs-label-wrapper">
            {icon}
            {label}
          </LabelWrapper>
        ) : (
          label
        )

        return (
          <AntdTabs.TabPane tab={tab} key={key || label}>
            {renderContent()}
          </AntdTabs.TabPane>
        )
      })}
    </AntdTabs>
  )
}

export default Tabs
