import { FormikProps } from 'formik'
import { FC, ReactNode, useState } from 'react'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import {
  GoalsCardAverageInput,
  GoalsCardAverageInputText,
  GoalsCardAverageInputWrap,
  GoalsCardRevenueInput,
  GoalsCardRevenueInputText,
  GoalsCardRevenueInputWrap,
  GoalsCardTitle,
  GoalsCardTitleWrap,
  GoalsCardWrapper,
  GoalsWrapContent
} from './edit-goals-card.styles'

export const calcRevenue = (average: string, quantity: string) => {
  return parseInt(average) * parseInt(quantity) || 0
}

export const calcAverage = (quantity: string, revenue: string) => {
  return parseInt(revenue) / parseInt(quantity) || 0
}

interface Props {
  setTotal?: (id: number, value: number) => void
  type: string
  formikProps: FormikProps<any>
  icon?: ReactNode
  title?: string
}

const EditGoalsCard: FC<Props> = ({ type, icon, title, formikProps }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const content = (
    <GoalsWrapContent>
      <GoalsCardAverageInputWrap>
        <GoalsCardAverageInputText>
          Average Cost?
          <GoalsCardAverageInput
            type="number"
            name={`${type}.average`}
            onChange={(e: any) => {
              formikProps.values[type].revenue = calcRevenue(
                formikProps.values[type].quantity,
                e.target.value
              )
              formikProps.handleChange(e)
            }}
          />
        </GoalsCardAverageInputText>
        <GoalsCardAverageInputText>
          Quantity Per Month
          <GoalsCardAverageInput
            type="number"
            name={`${type}.quantity`}
            onChange={(e: any) => {
              formikProps.values[type].revenue = calcRevenue(
                e.target.value,
                formikProps.values[type].average
              )
              formikProps.handleChange(e)
            }}
          />
        </GoalsCardAverageInputText>
      </GoalsCardAverageInputWrap>

      <GoalsCardRevenueInputWrap>
        <GoalsCardRevenueInputText>
          Revenue Per Month
          <GoalsCardRevenueInput
            type="number"
            name={`${type}.revenue`}
            onChange={(e: any) => {
              formikProps.values[type].average = calcAverage(
                formikProps.values[type].quantity,
                e.target.value
              )
              formikProps.handleChange(e)
            }}
          />
        </GoalsCardRevenueInputText>
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
