import { FormikProps } from 'formik'
import { FC, ReactNode, useState } from 'react'

import Input from '../../../../components/form/input/input.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import formatter from '../../../../managers/formatter.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import {
  GoalsCardAverageInputText,
  GoalsCardAverageInputWrap,
  GoalsCardRevenueInputWrap,
  GoalsCardTitle,
  GoalsCardTitleWrap,
  GoalsCardWrapper,
  GoalsWrapContent
} from './edit-goals-card.styles'

export const appendAED = (v: number): string => {
  return `${v.toLocaleString('it')} AED`
}

interface Props {
  setTotal?: (id: number, value: number) => void
  type: string
  formikProps: FormikProps<any>
  icon?: ReactNode
  title?: string
}

const EditGoalsCard: FC<Props> = ({
  type: fieldName,
  icon,
  title,
  formikProps
}) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const { values } = formikProps

  const handleChange = (name: string, type: string, value: string) => {
    const previousValue = values[type] // get previous values
    const { average, quantity } = previousValue
    let currentValue
    if (name === 'average') {
      currentValue = {
        average: value ?? '',
        quantity: quantity,
        total: Number(value) * Number(quantity) || 0
      }
    }
    if (name === 'quantity') {
      currentValue = {
        average: average,
        quantity: value ?? '',
        total: Number(average) * Number(value) || 0
      }
    }
    if (name === 'total') {
      currentValue = {
        average: average,
        quantity:
          Number(value) === 0 ? 0 : Number(value) / Number(average) || 0,
        total: Number(value) || 0
      }
    }
    formikProps.setFieldValue(type, currentValue)
  }

  const content = (
    <GoalsWrapContent>
      <GoalsCardAverageInputWrap>
        <GoalsCardAverageInputText>
          <Input
            id={`average-${fieldName}`}
            name="average"
            format={formatter().number()}
            onChange={(e) => handleChange('average', fieldName, e.target.value)}
            label={t('financials:edit-goals.average-cost')}
            value={values[fieldName].average}
          />
        </GoalsCardAverageInputText>
        <GoalsCardAverageInputText>
          <Input
            id={`quantity-${fieldName}`}
            name="quantity"
            format={formatter().number()}
            onChange={(e) =>
              handleChange('quantity', fieldName, e.target.value)
            }
            label={t('financials:edit-goals.quantity')}
            value={values[fieldName].quantity}
          />
        </GoalsCardAverageInputText>
      </GoalsCardAverageInputWrap>

      <GoalsCardRevenueInputWrap>
        <Input
          id={`total-${fieldName}`}
          name="total"
          format={formatter().number()}
          onChange={(e) => handleChange('total', fieldName, e.target.value)}
          label={t('financials:edit-goals.revenue-per-month') + ' (AED)'}
          value={Number(values[fieldName].total)}
        />
      </GoalsCardRevenueInputWrap>
    </GoalsWrapContent>
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

export default EditGoalsCard
