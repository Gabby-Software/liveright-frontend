import { Form, Formik, FormikProps } from 'formik'
import { FC } from 'react'

import {
  CallGoalIcon,
  ClientGoalIcon,
  GroupGoalIcon,
  OtherGoalIcon
} from '../../../../assets/media/icons'
import EditGoalsCard from '../edit-goals-card/edit-goals-card'
import EditGoalsOtherCard from '../edit-goals-card/edit-goals-other-card.component'
import EditGoalsSummary from '../edit-goals-summary/edit-goals-summary.component'
import { GoalsList, GoalsListWrapper } from './edit-goals-form.styles'

interface EditGoalsCardListProps {}

const calcTotalMonth = (values: any) => {
  return (
    (parseInt(values.ptSessions.revenue) || 0) +
    (parseInt(values.consultations.revenue) || 0) +
    (parseInt(values.coaching.revenue) || 0) +
    (parseInt(values.other.revenue) || 0)
  )
}

const calcTotalYear = (values: any) => {
  return (
    ((parseInt(values.ptSessions.revenue) || 0) +
      (parseInt(values.consultations.revenue) || 0) +
      (parseInt(values.coaching.revenue) || 0) +
      (parseInt(values.other.revenue) || 0)) *
    12
  )
}

const calcTotalWeek = (values: any) => {
  return (
    ((parseInt(values.ptSessions.revenue) || 0) +
      (parseInt(values.consultations.revenue) || 0) +
      (parseInt(values.coaching.revenue) || 0) +
      (parseInt(values.other.revenue) || 0)) /
    4
  )
}

const EditGoalsCardList: FC<EditGoalsCardListProps> = ({}) => {
  const initialValues = {
    ptSessions: { average: 0, quantity: 0, revenue: 0 },
    consultations: { average: 0, quantity: 0, revenue: 0 },
    coaching: { average: 0, quantity: 0, revenue: 0 },
    other: { revenue: 0 }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(formikProps: FormikProps<any>) => (
        <Form>
          <GoalsListWrapper>
            <GoalsList>
              <EditGoalsCard
                type="ptSessions"
                formikProps={formikProps}
                icon={<GroupGoalIcon />}
                title="PT Sessions"
              />

              <EditGoalsCard
                type="consultations"
                formikProps={formikProps}
                icon={<CallGoalIcon />}
                title="Consultation"
              />
              <EditGoalsCard
                type="coaching"
                formikProps={formikProps}
                icon={<ClientGoalIcon />}
                title="Coaching"
              />

              <EditGoalsOtherCard
                type="other"
                formikProps={formikProps}
                icon={<OtherGoalIcon />}
                title="Other Revenue"
              />
            </GoalsList>
            <EditGoalsSummary
              totalMonth={calcTotalMonth(formikProps.values)}
              totalYear={calcTotalYear(formikProps.values)}
              totalWeek={calcTotalWeek(formikProps.values)}
            />
          </GoalsListWrapper>
        </Form>
      )}
    </Formik>
  )
}

export default EditGoalsCardList
