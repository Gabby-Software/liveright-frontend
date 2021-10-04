import { FC } from 'react'

import {
  ButtonText,
  Summary,
  SummaryButton,
  SummaryHead,
  SummaryTargetText,
  SummaryTargetValue,
  SummaryTargetWrapper,
  SummaryTotal,
  SummaryWrapper
} from './edit-goals-summary.styles'

interface EditGoalsSummaryProps {
  totalMonth: number
  totalYear: number
  totalWeek: number
}

const EditGoalsSummary: FC<EditGoalsSummaryProps> = ({
  totalMonth,
  totalYear,
  totalWeek
}) => {
  return (
    <Summary>
      <SummaryWrapper>
        <SummaryHead>Monthly Target</SummaryHead>
        <SummaryTotal>{totalMonth} AED</SummaryTotal>
        <SummaryTargetWrapper>
          <SummaryTargetText>Weekly Target</SummaryTargetText>
          <SummaryTargetValue>{totalWeek} AED</SummaryTargetValue>
        </SummaryTargetWrapper>
        <SummaryTargetWrapper>
          <SummaryTargetText>Yearly Target</SummaryTargetText>
          <SummaryTargetValue>{totalYear} AED</SummaryTargetValue>
        </SummaryTargetWrapper>
      </SummaryWrapper>
      <SummaryButton type="submit">
        <ButtonText>Save Goals</ButtonText>
      </SummaryButton>
    </Summary>
  )
}

export default EditGoalsSummary
