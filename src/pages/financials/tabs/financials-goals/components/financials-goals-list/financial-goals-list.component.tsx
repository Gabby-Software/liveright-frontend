import { FC } from 'react'

import {
  ClientSolidIcon,
  GroupSolidIcon,
  PhoneSolidIcon,
  RevenueSolidIcon
} from '../../../../../../assets/media/icons'
import useGoals from '../../../../../../hooks/api/goals/useGoals'
import useInvoices from '../../../../../../hooks/api/invoices/useInvoices'
import useSessions from '../../../../../../hooks/api/sessions/useSessions'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { TargetDataType } from '../../../../../../types/goals-api-data.type'
import FinancialsGoalsCard from '../financials-goals-card/financials-goals-card.component'
import { ListWrapper } from './financial-goals-list.styles'

interface FinancialsGoalsListProps {}

const FinancialsGoalsList: FC<FinancialsGoalsListProps> = ({}) => {
  const { t } = useTranslation()

  const { invoices } = useInvoices({ perPage: 100000 })

  const generalRevenue = invoices.reduce((acc, value) => {
    return acc + value.total
  }, 0)
  const coachingRevenue = invoices.reduce((acc, value) => {
    const revenue = value.type === 'Coaching session' ? acc + value.total : acc
    return revenue
  }, 0)

  const ptSessionRevenue = invoices.reduce((acc, value) => {
    const revenue = value.type === 'PT session' ? acc + value.total : acc
    return revenue
  }, 0)
  const consultRevenue = invoices.reduce((acc, value) => {
    const revenue = value.type === 'Consultation' ? acc + value.total : acc
    return revenue
  }, 0)
  const otherRevenue = invoices.reduce((acc, value) => {
    const revenue =
      value.type !== 'PT session' &&
      value.type !== 'Coaching session' &&
      value.type !== 'Consultation'
        ? acc + value.total
        : acc
    return revenue
  }, 0)

  const { sessions } = useSessions({ perPage: 100000 })

  const ptSessions = sessions.filter((item) => {
    return item.type === 'Paid PT'
  })
  const consultations = sessions.filter((item) => {
    return item.type === 'Consulting'
  })
  const coaching = sessions.filter((item) => {
    return item.type === 'Coaching'
  })

  const { data: goalsData } = useGoals()

  const getGoalsTargetByType = (
    type: string,
    goals: TargetDataType[] | null = goalsData
  ): number | undefined => {
    const filteredGoals = goals?.filter((goal) => goal.type === type)
    return filteredGoals?.[filteredGoals.length - 1]?.goal
  }

  return (
    <ListWrapper>
      <FinancialsGoalsCard
        title={t('financials:overview.revenue')}
        planned={200}
        icon={<RevenueSolidIcon />}
        current={generalRevenue}
        currency="AED"
      />
      <FinancialsGoalsCard
        title={t('financials:overview.coaching-revenue')}
        planned={getGoalsTargetByType('coaching')}
        icon={<RevenueSolidIcon />}
        current={coachingRevenue}
        currency="AED"
      />
      <FinancialsGoalsCard
        title={t('financials:overview.pt-sessions-revenue')}
        planned={getGoalsTargetByType('pt_session')}
        icon={<RevenueSolidIcon />}
        current={ptSessionRevenue}
        currency="AED"
      />
      <FinancialsGoalsCard
        title={t('financials:overview.consultation-revenue')}
        planned={getGoalsTargetByType('consultation')}
        icon={<RevenueSolidIcon />}
        current={consultRevenue}
        currency="AED"
      />
      <FinancialsGoalsCard
        title={t('financials:overview.other')}
        planned={getGoalsTargetByType('other')}
        icon={<RevenueSolidIcon />}
        current={otherRevenue}
        currency="AED"
      />
      <FinancialsGoalsCard
        title={t('financials:overview.pt-sessions')}
        planned={getGoalsTargetByType('pt_session_quantity')}
        current={ptSessions.length}
        icon={<GroupSolidIcon />}
      />
      <FinancialsGoalsCard
        title={t('financials:overview.consultation')}
        planned={getGoalsTargetByType('consultation_quantity')}
        current={consultations.length}
        icon={<PhoneSolidIcon />}
      />
      <FinancialsGoalsCard
        title={t('financials:overview.coaching')}
        planned={getGoalsTargetByType('coaching_quantity')}
        current={coaching.length}
        icon={<ClientSolidIcon />}
      />
    </ListWrapper>
  )
}

export default FinancialsGoalsList
