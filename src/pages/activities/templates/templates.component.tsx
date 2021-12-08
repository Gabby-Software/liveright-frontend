import React, { useState } from 'react'

import Tabs from '../../../components/tabs/tabs.component'
import { Title } from '../../../components/typography'
import ActivityLayout from '../components/layout/layout.component'
import { Styles } from './templates.styles'
import TrainingSplits from './training-split/splits/splits.component'

const tabs = [
  {
    label: 'Splits',
    key: 'split',
    renderContent: () => <TrainingSplits />
  },
  {
    label: 'Training Plans',
    key: 'training',
    renderContent: () => <div>Hello</div>
  },
  {
    label: 'Diet Plans',
    key: 'diet',
    renderContent: () => <div>Hello</div>
  },
  {
    label: 'Workouts',
    key: 'workout',
    renderContent: () => <div>Hello</div>
  },
  {
    label: 'Excercies',
    key: 'excercise',
    renderContent: () => <div>Hello</div>
  },
  {
    label: 'Meal Plans',
    key: 'mealplan',
    renderContent: () => <div>Hello</div>
  },
  {
    label: 'Food',
    key: 'food',
    renderContent: () => <div>Hello</div>
  }
]
export default function Templates() {
  const [activeTab, setActiveTab] = useState('split')

  return (
    <ActivityLayout>
      <Styles>
        <div className="Templates__title-container">
          <Title>Templates</Title>
        </div>
        <div className="Templates__note">
          Manage your templates (see, edit) and add them to create a plan !
        </div>

        <div className="Templates__divider" />

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabs={tabs}
          className={'Templates__tabs'}
          // justify={isMobile ? 'between' : undefined}
        />
      </Styles>
    </ActivityLayout>
  )
}
