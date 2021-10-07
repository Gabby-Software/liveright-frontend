import { FormikProps } from 'formik'
import { FC, useEffect, useState } from 'react'

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
  const { initialValues, values, submitCount } = formikProps
  const [refValues, setRefValues] = useState(values)
  const { t } = useTranslation()

  useEffect(() => {
    submitCount && setRefValues(values)
  }, [submitCount])

  const hasChanged: boolean =
    JSON.stringify(refValues) !== JSON.stringify(values)

  console.log({ initialValues, values, hasChanged, formikProps })

  return (
    <Summary>
      <SummaryWrapper>
        <SummaryHead>{t('financials:edit-goals.monthly-target')}</SummaryHead>
        <SummaryTotal>{totalMonth} AED</SummaryTotal>
        <SummaryTargetWrapper>
          <SummaryTargetText>
            {t('financials:edit-goals.weekly-target')}
          </SummaryTargetText>
          <SummaryTargetValue>{totalWeek} AED</SummaryTargetValue>
        </SummaryTargetWrapper>
        <SummaryTargetWrapper>
          <SummaryTargetText>
            {t('financials:edit-goals.yearly-target')}
          </SummaryTargetText>
          <SummaryTargetValue>{totalYear} AED</SummaryTargetValue>
        </SummaryTargetWrapper>
      </SummaryWrapper>
      <SummaryButton disabled={!hasChanged} onClick={formikProps.submitForm}>
        <ButtonText>{t('financials:edit-goals.save-goals')}</ButtonText>
      </SummaryButton>
    </Summary>
  )
}

export default EditGoalsSummary
