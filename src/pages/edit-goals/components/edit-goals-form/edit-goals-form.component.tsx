import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'

import {
  CallGoalIcon,
  ClientGoalIcon,
  GroupGoalIcon,
  OtherGoalIcon
} from '../../../../assets/media/icons'
import { toast } from '../../../../components/toast/toast.component'
import useGoals from '../../../../hooks/api/goals/useGoals'
import { handleError } from '../../../../managers/api.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { updateGoalsTarget } from '../../../../services/api/goals'
import { TargetDataType } from '../../../../types/goals-api-data.type'
import EditGoalsCard from '../edit-goals-card/edit-goals-card'
import EditGoalsOtherCard from '../edit-goals-card/edit-goals-other-card.component'
import EditGoalsSummary from '../edit-goals-summary/edit-goals-summary.component'
import { GoalsList, GoalsListWrapper } from './edit-goals-form.styles'

interface EditGoalsCardListProps {}

const calcTotalMonth = (values: any) => {
  return (
    (parseInt(values.pt_session.total) || 0) +
    (parseInt(values.consultation.total) || 0) +
    (parseInt(values.coaching.total) || 0) +
    (parseInt(values.other.total) || 0)
  )
}

const calcTotalYear = (values: any) => {
  return (
    ((parseInt(values.pt_session.total) || 0) +
      (parseInt(values.consultation.total) || 0) +
      (parseInt(values.coaching.total) || 0) +
      (parseInt(values.other.total) || 0)) *
    12
  )
}

const calcTotalWeek = (values: any) => {
  return (
    ((parseInt(values.pt_session.total) || 0) +
      (parseInt(values.consultation.total) || 0) +
      (parseInt(values.coaching.total) || 0) +
      (parseInt(values.other.total) || 0)) /
    4
  )
}

type GoalsData = { average: number; quantity: number; total: number }

type GoalsType =
  | {
      pt_session: GoalsData
      consultation: GoalsData
      coaching: GoalsData
      other: { total: number }
    }
  | { [x: string]: { total: number } }

const EditGoalsCardList: FC<EditGoalsCardListProps> = ({}) => {
  const { t } = useTranslation()
  const { data } = useGoals()

  const apiValues: GoalsType | undefined = data
    ?.map((curr) => {
      return { [curr.type]: { total: curr.goal } }
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }))

  const initialValues: GoalsType = apiValues || {
    pt_session: { average: 0, quantity: 0, total: 0 },
    consultation: { average: 0, quantity: 0, total: 0 },
    coaching: { average: 0, quantity: 0, total: 0 },
    other: { total: 0 }
  }

  const handleSubmit = async (
    values: GoalsType,
    actions: FormikHelpers<GoalsType>
  ) => {
    const targets: TargetDataType[] = Object.entries(values).map(
      ([key, value]) => ({
        type: key,
        value_type: 'number',
        goal: value.total,
        frequency: 'm'
      })
    )
    try {
      await updateGoalsTarget({ targets })
      toast.show({ type: 'success', msg: t('alerts:goal-update-success') })
    } catch (e: any) {
      handleError(actions)
      toast.show({ type: 'error', msg: e.message })
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        pt_session: Yup.object().shape({
          average: Yup.string(),
          total: Yup.number(),
          quantity: Yup.number()
        }),
        consultation: Yup.object().shape({
          average: Yup.number(),
          total: Yup.number(),
          quantity: Yup.number()
        }),
        coaching: Yup.object().shape({
          average: Yup.number(),
          total: Yup.number(),
          quantity: Yup.number()
        }),
        other: Yup.object().shape({
          total: Yup.number()
        })
      })}
    >
      {(formikProps: FormikProps<any>) => (
        <Form>
          <GoalsListWrapper>
            <GoalsList>
              <EditGoalsCard
                type="pt_session"
                formikProps={formikProps}
                icon={<GroupGoalIcon />}
                title="PT Sessions"
              />

              <EditGoalsCard
                type="consultation"
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
              formikProps={formikProps}
            />
          </GoalsListWrapper>
        </Form>
      )}
    </Formik>
  )
}

export default EditGoalsCardList