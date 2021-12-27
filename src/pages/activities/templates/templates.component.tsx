import React, { useState } from 'react'

import Tabs from '../../../components/tabs/tabs.component'
import { Title } from '../../../components/typography'
import ActivityLayout from '../components/layout/layout.component'
import DietPlans from './diet-plan/plans/plans.component'
import Exercies from './exercise/exercises.component'
import Foods from './food/foods.component'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import Meals from './meal/meals.component'
import MealPlans from './meal-plan/meal-plans.component'
import { Styles, HeaderSubTitle } from './templates.styles'
import TrainingPlans from './training-plan/plans/plans.component'
import TrainingSplits from './training-split/splits/splits.component'
import Workouts from './workout/workouts.component'
import WorkoutDays from './workout-days/days/days.component'

const tabs = [
  {
    label: 'Splits',
    key: 'split',
    renderContent: () => <TrainingSplits />
  },
  {
    label: 'Training Plans',
    key: 'training',
    renderContent: () => <TrainingPlans />
  },
  {
    label: 'Workout days',
    key: 'days',
    renderContent: () => <WorkoutDays />
  },
  {
    label: 'Workouts',
    key: 'workout',
    renderContent: () => <Workouts />
  },
  {
    label: 'Exercies',
    key: 'excercise',
    renderContent: () => <Exercies />
  },
  {
    label: 'Diet Plans',
    key: 'diet',
    renderContent: () => <DietPlans />
  },
  {
    label: 'Meal Plans',
    key: 'mealplan',
    renderContent: () => <MealPlans />
  },
  {
    label: 'Meals',
    key: 'meal',
    renderContent: () => <Meals />
  },
  {
    label: 'Food',
    key: 'food',
    renderContent: () => <Foods />
  }
]
export default function Templates() {
  const [activeTab, setActiveTab] = useState('split')
  const isMobile = useIsMobile()

  return isMobile ? (
    <MobilePage
      title="Templates"
      headerSpacing={14}
      headerComponent={
        <HeaderSubTitle>
          Manage your templates (see, edit) and add them to create a plan !
        </HeaderSubTitle>
      }
    >
      <ActivityLayout>
        <Styles>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabs={tabs}
            className={'Templates__tabs'}
            // justify={isMobile ? 'between' : undefined}
          />
        </Styles>
      </ActivityLayout>
    </MobilePage>
  ) : (
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
