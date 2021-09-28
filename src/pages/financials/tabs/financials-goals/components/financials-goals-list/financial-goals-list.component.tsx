import { FC } from 'react'

import useInvoices from '../../../../../../hooks/api/invoices/useInvoices'
import useSessions from '../../../../../../hooks/api/sessions/useSessions'

import FinancialsGoalsCard from '../financials-goals-card/financials-goals-card.component'

import {
  ClientSolidIcon,
  GroupSolidIcon,
  PhoneSolidIcon,
  RevenueSolidIcon
} from '../../../../../../assets/media/icons'

import { ListWrapper } from './financial-goals-list.styles'

interface FinancialsGoalsListProps {}

const FinancialsGoalsList: FC<FinancialsGoalsListProps> = ({}) => {
  const { invoices } = useInvoices()

  console.log(invoices)

  const generalRevenue = invoices.reduce((acc, value) => {
    return acc + value.total
  }, 0)
  const coachingRevenue = invoices.reduce((acc, value) => {
    const revenue = value.type === 'Coaching session' ? acc + value.total : acc
    return revenue
  }, 0)
  // console.log(coachingRevenue)
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
  // console.log(otherRevenue)

  // console.log(generalRevenue)

  const { sessions } = useSessions()

  const ptSessions = sessions.filter((item) => {
    return item.type === 'Paid PT'
  })
  const consultations = sessions.filter((item) => {
    return item.type === 'Consulting'
  })
  const coaching = sessions.filter((item) => {
    return item.type === 'Coaching'
  })

  return (
    <ListWrapper>
      <FinancialsGoalsCard
        title="Revenue"
        planned="200"
        icon={<RevenueSolidIcon />}
        current={generalRevenue}
      />
      <FinancialsGoalsCard
        title="Coaching revenue"
        planned="300"
        icon={<RevenueSolidIcon />}
        current={coachingRevenue}
      />
      <FinancialsGoalsCard
        title="PT Sessions Revenue"
        planned="20"
        icon={<RevenueSolidIcon />}
        current={ptSessionRevenue}
      />
      <FinancialsGoalsCard
        title="Consultation Revenue"
        planned="20"
        icon={<RevenueSolidIcon />}
        current={consultRevenue}
      />
      <FinancialsGoalsCard
        title="Other Revenue"
        planned="20"
        icon={<RevenueSolidIcon />}
        current={otherRevenue}
      />
      <FinancialsGoalsCard
        title="PT Sessions"
        planned="20"
        current={ptSessions.length}
        icon={<GroupSolidIcon />}
      />
      <FinancialsGoalsCard
        title="Consultation"
        planned="20"
        current={consultations.length}
        icon={<PhoneSolidIcon />}
      />
      <FinancialsGoalsCard
        title="Coaching"
        planned="20"
        current={coaching.length}
        icon={<ClientSolidIcon />}
      />
    </ListWrapper>
  )
}

export default FinancialsGoalsList
