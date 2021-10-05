import { FormikProps } from 'formik'
import { FC } from 'react'

import { useTranslation } from '../../../../modules/i18n/i18n.hook'
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
  formikProps: FormikProps<any>
}

const EditGoalsSummary: FC<EditGoalsSummaryProps> = ({
  totalMonth,
  totalYear,
  totalWeek,
  formikProps
}) => {
  const { t } = useTranslation()
  return (
    <Summary>
      <SummaryWrapper>
        <SummaryHead>Monthly Target</SummaryHead>
        <SummaryTotal>{totalMonth.toLocaleString('it')} AED</SummaryTotal>
        <SummaryTargetWrapper>
          <SummaryTargetText>Weekly Target</SummaryTargetText>
          <SummaryTargetValue>
            {totalWeek.toLocaleString('it')} AED
          </SummaryTargetValue>
        </SummaryTargetWrapper>
        <SummaryTargetWrapper>
          <SummaryTargetText>Yearly Target</SummaryTargetText>
          <SummaryTargetValue>
            {totalYear.toLocaleString('it')} AED
          </SummaryTargetValue>
        </SummaryTargetWrapper>
      </SummaryWrapper>
      <SummaryButton onClick={formikProps.submitForm}>
        <ButtonText>{t('financials:edit-goals.save-goals')}</ButtonText>
      </SummaryButton>
    </Summary>
  )
}

export default EditGoalsSummary
