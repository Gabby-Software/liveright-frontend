// import moment from 'moment'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router'

// import { CaretLeftIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
// import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../../components/cards/card/card.component'
// import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import { Subtitle, Title } from '../../../../components/typography'
import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import SplitDayTrainingCard from '../../components/split-day-card/split-day-training-card.component'
import { Styles } from './training-plan-day-view.styles'

interface TrainingPlanDayViewProps {
  onClose: any
  index: number
  setIndex: (i: number) => void
  onEdit: () => void
}

export default function TrainingPlanDayView({
  onClose,
  index,
  // setIndex,
  onEdit
}: TrainingPlanDayViewProps) {
  const isMobile = useIsMobile()
  const [scheduleView] = useState(false)

  const params = useParams<any>()

  const { trainingPlan, revision } = useTrainingPlan({
    clientId: params.clientId,
    id: params.id,
    revisionId: params.revisionId
  })

  const { activity } = useMemo(() => {
    const activity = revision?.activities
      ? revision?.activities?.[index]
      : revision?.days?.[0]?.activities?.[index]
    return {
      activity
    }
  }, [index, revision])

  const content = (
    <Styles>
      <Card className="TrainingSplitDayView__card">
        {!isMobile && (
          <>
            <GoBack spacing={4} onClick={onClose}>
              Go Back to Training Plan Overview
            </GoBack>

            <div className="TrainingSplitDayView__title-container">
              <Title>Current Training Plan</Title>

              <Button onClick={onEdit}>Edit Training Split</Button>
            </div>

            <div className="TrainingSplitDayView__divider" />
          </>
        )}
        <Subtitle>{trainingPlan.name}</Subtitle>
      </Card>

      <Card>
        {/* <div>
          <Title className="TrainingSplitDayView__day-title">
            <span>{`Day ${index + 1}`}</span>

            <div className="TrainingSplitDayView__day-arrows">
              <IconButton
                size="sm"
                onClick={() =>
                  setIndex(
                    (index - 1 + revision.days_count) % revision.days_count
                  )
                }
              >
                <CaretLeftIcon />
              </IconButton>
              <IconButton
                size="sm"
                onClick={() => setIndex((index + 1) % revision.days_count)}
              >
                <CaretLeftIcon />
              </IconButton>
            </div>
          </Title>
        </div> */}

        {/* <div className="TrainingSplitDayView__day-subtitle-container">
          <p className="TrainingSplitDayView__day-subtitle">
            {moment(revision.scheduled_start_on)
              .add(index, 'day')
              .format('dddd')}
          </p>

          <div className="TrainingSplitDayView__day-toggle">
            <FormToggleUI
              value={scheduleView}
              onUpdate={() => setScheduleView(!scheduleView)}
            />
            <p className="TrainingSplitDayView__day-toggle-label">
              See with schedule view
            </p>
          </div>
        </div>

        <div className="TrainingSplitDayView__divider" /> */}

        <div className="TrainingSplitDayView__cards">
          {!scheduleView ? (
            <SplitDayTrainingCard data={activity} />
          ) : (
            <SplitDayTrainingCard
              data={activity?.day}
              scheduleTime={activity?.time || 'Not Set'}
            />
          )}
        </div>
      </Card>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Current Training Split"
      headerTopComponent={
        <HeaderLink onClick={onClose}>
          Back to Training plan overview
        </HeaderLink>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
