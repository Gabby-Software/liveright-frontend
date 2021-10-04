import { FormikProps } from 'formik'
import { FC, ReactNode, useState } from 'react'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import {
  GoalsCardAverageInput,
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
const EditGoalsOtherCard: FC<Props> = ({ type, icon, title, formikProps }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const content = (
    <GoalsCardOtherInputWrap>
      <GoalsCardOterInputText>
        Revenue Per Month
        <GoalsCardAverageInput
          name={`${type}.revenue`}
          type="number"
          onChange={(e: any) => {
            formikProps.handleChange(e)
          }}
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
