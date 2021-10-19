import { toast } from '../components/toast/toast.component'
import { useTranslation } from '../modules/i18n/i18n.hook'
import { updateGoalsTarget } from '../services/api/goals'
import { FinancialsSummaryType } from '../types/financials'
import { TargetDataType } from '../types/goals-api-data.type'
import { getOverviewTableData } from '../utils/api/financials'
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
  const { mutate: goalsMutate, getGoalsTargetByType } = useGoals({
    filter: { account_id: uuid }
  })

  // const getTargetMonthlyIncome = (
  //   goalsData: TargetDataType[] | null = userGoals
  // ) => {
  //   const types = ['pt_session', 'consultation', 'coaching', 'other']
  //   const filteredGoals = goalsData?.filter((g) => types.includes(g.type))
  //   return filteredGoals?.reduce((acc, g) => acc + g.goal, 0)
  // }

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
    tableData: getOverviewTableData(
      monthlyIncomes,
      progressCount,
      sessionCount,
      getGoalsTargetByType
    )
  }
}
