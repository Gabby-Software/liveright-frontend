import React, { useMemo } from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import SplitDayDietCard from '../split-day-card/split-day-diet-card.component'
import Styles, { DialogStyles } from './meal-plan-day-dialog.styles'

interface IProps {
  data: any
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  toLink: string
}

const MealPlanDayDialog = ({
  data,
  open,
  onClose,
  title,
  subtitle,
  toLink
}: IProps) => {
  const modifiedData = useMemo(() => {
    if (data?.is_day_target) {
      return {
        ...data,
        total_target: data.custom_target,
        activites: []
      }
    }
    return data
  }, [])

  return (
    <DialogStyles
      visible={open}
      onCancel={onClose}
      width={1000}
      footer={false}
      closeIcon={<CrossIcon />}
      centered
    >
      <Styles>
        <div className="MealPlanDayDialog__header">
          <h3 className="MealPlanDayDialog__header-title">{title}</h3>
          {subtitle && (
            <h6 className="MealPlanDayDialog__header-subtitle">{subtitle}</h6>
          )}
        </div>
        <SplitDayDietCard
          data={modifiedData}
          actionComponent={
            <Button variant="secondary" to={toLink}>
              Edit Diet Plan
            </Button>
          }
          contentClass="MealPlanDayDialog__content"
        />
      </Styles>
    </DialogStyles>
  )
}

export default MealPlanDayDialog
