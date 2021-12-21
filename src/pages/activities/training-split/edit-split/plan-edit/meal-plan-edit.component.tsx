import React from 'react'

import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Routes } from '../../../../../enums/routes.enum'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import MealPlanDayEdit from '../../../components/edit-dialog/mealplan/mealplanday-edit.component'
import { TS_DEMO } from '../../../demo/splits'

const MealPlanEdit = () => {
  const data = TS_DEMO
  return (
    <MobilePage
      title="Edit Meal Plan Day"
      headerTopComponent={
        <MobileBack to={Routes.ACTIVITIES_TS} alias="training-split" />
      }
    >
      <MealPlanDayEdit data={data[0].mealPlanDay} />
    </MobilePage>
  )
}

export default MealPlanEdit
