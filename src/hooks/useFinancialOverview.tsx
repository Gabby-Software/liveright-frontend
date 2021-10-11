import { TargetDataType } from '../types/goals-api-data.type'
import useGoals from './api/goals/useGoals'
import useStatistic from './api/stat/useStatistic'
import { useAuth } from './auth.hook'

export const useFinancialOverview = () => {
  const { statistic: monthlyIncomes, progressCount } = useStatistic({
    range: 'month'
  })
  const { uuid } = useAuth()
  const { data: goals } = useGoals()
  const userGoals =
    goals?.filter((g: any) => g.created_by.uuid === uuid) || null

  const getTargetMonthlyIncome = (
    goalsData: TargetDataType[] | null = userGoals
  ) => {
    const types = ['pt_session', 'consultation', 'coaching', 'other']
    const filteredGoals = goalsData?.filter((g) => types.includes(g.type))
    return filteredGoals?.reduce((acc, g) => acc + g.goal, 0)
  }

  const getGoalsTargetByType = (
    type: string,
    goalsData: TargetDataType[] | null = userGoals
  ): number | undefined => {
    const filteredGoals = goalsData?.filter((goal) => goal.type === type)
    return filteredGoals?.[filteredGoals?.length - 1]?.goal
  }

  const data = {
    monthlyTarget: getTargetMonthlyIncome(),
    monthlyRevenue: monthlyIncomes.total,
    coaching: [
      {
        target_name: 'sessions',
        target: getGoalsTargetByType(`coaching_quantity`),
        current: progressCount.coaching_sessions
      },
      {
        target_name: 'revenues',
        target: getGoalsTargetByType('coaching'),
        current: monthlyIncomes.coaching_sessions
      },
      {
        target_name: 'average',
        target: getGoalsTargetByType('coaching_average'),
        current:
          monthlyIncomes.coaching_sessions / progressCount.coaching_sessions
      }
    ],
    consultations: [
      {
        target_name: 'sessions',
        target: getGoalsTargetByType(`consultation_quantity`),
        current: progressCount.consultations_sessions
      },
      {
        target_name: 'revenues',
        target: getGoalsTargetByType('consultation'),
        current: monthlyIncomes.consultations_sessions
      },
      {
        target_name: 'average',
        target: getGoalsTargetByType('consultation_average'),
        current:
          monthlyIncomes.consultations_sessions /
          progressCount.consultations_sessions
      }
    ],
    pt: [
      {
        target_name: 'sessions',
        target: getGoalsTargetByType(`pt_session_quantity`),
        current: progressCount.pt_sessions
      },
      {
        target_name: 'revenues',
        target: getGoalsTargetByType('pt_session'),
        current: monthlyIncomes.pt_sessions
      },
      {
        target_name: 'average',
        target: getGoalsTargetByType('pt_session_average'),
        current: monthlyIncomes.pt_sessions / progressCount.pt_sessions
      }
    ],
    other: [
      {
        target_name: 'revenues',
        target: getGoalsTargetByType('other'),
        current: monthlyIncomes.other
      }
    ]
  }

  return data
}
