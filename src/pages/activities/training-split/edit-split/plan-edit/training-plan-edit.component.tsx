import React from 'react'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Routes } from '../../../../../enums/routes.enum'

import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import WorkoutDayEdit from '../../../components/edit-dialog/workoutday/workoutday-edit.component'
import { TS_DEMO } from '../../../demo/splits'

const TrainingPlanEdit = () => {
  const data = TS_DEMO
  return (
    <MobilePage
      title="Edit Training Plan Day"
      headerTopComponent={
        <MobileBack to={Routes.ACTIVITIES_TS} alias='training-split' />
      }
    >
      <WorkoutDayEdit data={data[0].workoutDay} />
    </MobilePage>
  )
}

export default TrainingPlanEdit
