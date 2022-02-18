import React from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import SplitDayTrainingCard from '../split-day-card/split-day-training-card.component'
import Styles, { DialogStyles } from './workout-plan-day-dialog.styles'

interface IProps {
  data: any
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  toLink: string
}

const WorkoutPlanDayDialog = ({
  data,
  open,
  onClose,
  title,
  subtitle,
  toLink
}: IProps) => {
  const isMobile = useIsMobile()

  return (
    <DialogStyles
      visible={open}
      onCancel={onClose}
      width={isMobile ? '' : 1000}
      footer={false}
      closeIcon={<CrossIcon />}
      centered
    >
      <Styles>
        <div className="WorkoutPlanDayDialog__header">
          <h3 className="WorkoutPlanDayDialog__header-title">{title}</h3>
          {subtitle && (
            <h6 className="WorkoutPlanDayDialog__header-subtitle">
              {subtitle}
            </h6>
          )}
        </div>
        <SplitDayTrainingCard
          data={data}
          actionComponent={
            <Button variant="secondary" to={toLink}>
              Edit Training Plan
            </Button>
          }
          contentClass="WorkoutPlanDayDialog__content"
        />
      </Styles>
    </DialogStyles>
  )
}

export default WorkoutPlanDayDialog
