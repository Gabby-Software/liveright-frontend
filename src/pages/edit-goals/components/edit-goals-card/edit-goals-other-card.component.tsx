import { FormikProps } from 'formik'
import { FC, ReactNode, useState } from 'react'

import Input from '../../../../components/form/input/input.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import formatter from '../../../../managers/formatter.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { appendAED } from './edit-goals-card'
import {
  GoalsCardOterInputText,
  GoalsCardOtherInputWrap,
  GoalsCardTitle,
  GoalsCardTitleWrap,
  GoalsCardWrapper
} from './edit-goals-card.styles'

interface Props {
  icon: ReactNode
  type: string
  formikProps: FormikProps<any>
  title?: string
}
const EditGoalsOtherCard: FC<Props> = ({ icon, title, formikProps }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const content = (
    <GoalsCardOtherInputWrap>
      <GoalsCardOterInputText>
        <Input
          id={`other.total`}
          name={`other.total`}
          format={formatter().number()}
          onChange={(e: any) =>
            formikProps.setFieldValue('other.total', Number(e.target.value))
          }
          label={t('financials:edit-goals.revenue-per-month')}
          value={appendAED(Number(formikProps.values.other.total))}
        />
      </GoalsCardOterInputText>
    </GoalsCardOtherInputWrap>
  )

  return (
    <GoalsCardWrapper>
      {isMobile ? (
        <>
          <GoalsCardTitle
            onClick={() => {
              setOpen(!open)
            }}
          >
            <GoalsCardTitleWrap>
              {icon} {title}
            </GoalsCardTitleWrap>
          </GoalsCardTitle>
          {open && content}
        </>
      ) : (
        <>
          <GoalsCardTitle>
            <GoalsCardTitleWrap>
              {icon} {title}
            </GoalsCardTitleWrap>
          </GoalsCardTitle>
          {content}
        </>
      )}
    </GoalsCardWrapper>
  )
}
export default EditGoalsOtherCard
