import { toast } from '../components/toast/toast.component'
import { useTranslation } from '../modules/i18n/i18n.hook'
import { updateGoalsTarget } from '../services/api/goals'
import { FinancialsSummaryType } from '../types/financials'
import { TargetDataType } from '../types/goals-api-data.type'
import useGoals from './api/goals/useGoals'
import useStatistic from './api/stat/useStatistic'
import { useAuth } from './auth.hook'

interface UseFinancialOverview {
  monthlyTarget: number
  monthlyRevenue: number
  tableData: FinancialsSummaryType[]
  onUpdateGoals: (value: string, type: string) => void
}

export const useFinancialOverview = (): UseFinancialOverview => {
  const { t } = useTranslation()
  const {
    statistic: monthlyIncomes,
    count: sessionCount,
    progressCount
  } = useStatistic({
    range: 'month'
  })
  const { uuid } = useAuth()
  const { data: goals, mutate: goalsMutate } = useGoals()
  const userGoals =
    goals?.filter((g: any) => g.created_by.uuid === uuid) || null

  // const getTargetMonthlyIncome = (
  //   goalsData: TargetDataType[] | null = userGoals
  // ) => {
  //   const types = ['pt_session', 'consultation', 'coaching', 'other']
  //   const filteredGoals = goalsData?.filter((g) => types.includes(g.type))
  //   return filteredGoals?.reduce((acc, g) => acc + g.goal, 0)
  // }

  const getGoalsTargetByType = (
    type: string,
    goalsData: TargetDataType[] | null = userGoals
  ): number | undefined => {
    const filteredGoals = goalsData?.filter((goal) => goal.type === type)
    return filteredGoals?.[filteredGoals?.length - 1]?.goal
  }

  const onUpdateGoals = async (value: string, type: string) => {
    const targets: TargetDataType[] = []

    targets.push({
      type,
      value_type: 'number',
      goal: Number(value)
    })
    try {
      await updateGoalsTarget({ targets })
      toast.show({ type: 'success', msg: t('alerts:goal-update-success') })
      goalsMutate()
    } catch (e: any) {
      toast.show({ type: 'error', msg: e.message })
    }
  }

  return {
    monthlyTarget: getGoalsTargetByType('total_monthly_revenue') || 0,
    monthlyRevenue: monthlyIncomes.total || 0,
    onUpdateGoals,
    tableData: [
      {
        revenue: 'PT Sessions',
        type: 'pt_session',
        salesCompleted: progressCount.pt_sessions,
        avgRate: monthlyIncomes.pt_sessions / progressCount.pt_sessions,
        bookings: sessionCount.pt,
        projectedIncome: monthlyIncomes.pt_sessions,
        targetIncome: getGoalsTargetByType('pt_session') || 0
      },
      {
        revenue: 'Coaching',
        type: 'coaching',
        salesCompleted: progressCount.coaching_sessions,
        avgRate:
          monthlyIncomes.coaching_sessions / progressCount.coaching_sessions,
        bookings: sessionCount.coaching,
        projectedIncome: monthlyIncomes.coaching_sessions,
        targetIncome: getGoalsTargetByType('coaching') || 0
      },
      {
        revenue: 'Consultations',
        type: 'consultation',
        salesCompleted: progressCount.consultations_sessions,
        avgRate:
          monthlyIncomes.consultations_sessions /
          progressCount.consultations_sessions,
        bookings: sessionCount.consultation,
        projectedIncome: monthlyIncomes.consultations_sessions,
        targetIncome: getGoalsTargetByType('consultation') || 0
      },
      {
        revenue: 'Supplements Sales',
        type: '',
        salesCompleted: 0,
        avgRate: 0,
        bookings: 0,
        projectedIncome: 0,
        targetIncome: 0
      },
      {
        revenue: 'Meal Plan Sales',
        type: '',
        salesCompleted: 0,
        avgRate: 0,
        bookings: 0,
        projectedIncome: 0,
        targetIncome: 0
      },
      {
        revenue: 'Total',
        type: 'total_monthly_revenue',
        salesCompleted: 0,
        avgRate: 0,
        bookings: 0,
        projectedIncome: monthlyIncomes.total,
        targetIncome: getGoalsTargetByType('total_monthly_revenue') || 0
      }
    ]
  }
}
