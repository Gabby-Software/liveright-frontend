import moment from 'moment'
import { useMemo, useState } from 'react'

import { CaretLeftIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import IconButton from '../../../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../../../components/cards/card/card.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import { Subtitle, Title } from '../../../../../components/typography'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import SplitDayDietCard from '../../../components/split-day-card/split-day-diet-card.component'
import SplitDayOtherCard from '../../../components/split-day-card/split-day-other-card.component'
import SplitDayTrainingCard from '../../../components/split-day-card/split-day-training-card.component'
import { Styles } from './day-view.styles'

interface TrainingSplitDayViewProps {
  onClose: any
  index: number
  setIndex: (i: number) => void
  revision?: any
}

export default function TrainingSplitDayView({
  onClose,
  index,
  setIndex,
  revision
}: TrainingSplitDayViewProps) {
  const isMobile = useIsMobile()
  const [scheduleView, setScheduleView] = useState(false)

  const { day, activities } = useMemo(() => {
    const day = revision?.days?.[index]
    const workoutActivites: any[] =
      day?.training_plan_activities.activities?.map((a: any) => ({
        day: {
          activities: [a],
          name: a.name
        },
        time: a.time,
        type: 'workout'
      })) || []
    const mealActivites: any[] =
      day?.diet_plan_day?.activities?.map((a: any) => ({
        day: {
          activities: [a],
          name: a.name,
          total_target: a.total_target
        },
        time: a.time,
        type: 'meal'
      })) || []
    const exerciseActivities: any[] =
      day?.items?.map((a: any) => ({
        day: [a],
        time: a.time,
        type: 'other'
      })) || []

    const activities = workoutActivites.concat(
      mealActivites,
      exerciseActivities
    )
    activities.sort(
      (a, b) =>
        Date.parse('1970/01/01 ' + a.time || '00:00') -
        Date.parse('1970/01/01 ' + b.time || '00:00')
    )

    return {
      day,
      activities
    }
  }, [index, revision])

  const content = (
    <Styles>
      <Card className="TrainingSplitDayView__card">
        {!isMobile && (
          <>
            <GoBack spacing={4} onClick={onClose}>
              Go Back to Training Split Overview
            </GoBack>

            <div className="TrainingSplitDayView__title-container">
              <Title>Current Training Split</Title>

              <Button>Edit Training Split</Button>
            </div>

            <div className="TrainingSplitDayView__divider" />
          </>
        )}

        <div>
          <Subtitle>{revision.name}</Subtitle>
          <br />
          <div className="TrainingSplitDayView__badges">
            <div className="TrainingSplitDayView__badge">
              <p className="TrainingSplitDayView__badge-name">
                Chosen Diet Plan
              </p>

              <div className="TrainingSplitDayView__badge-badge">
                {revision.diet_plan?.name}
              </div>
            </div>
            <div className="TrainingSplitDayView__badge">
              <p className="TrainingSplitDayView__badge-name">
                Chosen Training Plan
              </p>

              <div className="TrainingSplitDayView__badge-badge">
                {revision.training_plan?.name}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <Title className="TrainingSplitDayView__day-title">
            <span>{`Day ${index + 1}`}</span>

            <div className="TrainingSplitDayView__day-arrows">
              <IconButton
                size="sm"
                onClick={() =>
                  setIndex(
                    ((index - 1 + revision.days_count) % revision.days_count) +
                      1
                  )
                }
              >
                <CaretLeftIcon />
              </IconButton>
              <IconButton
                size="sm"
                onClick={() =>
                  setIndex(((index + 1) % revision.days_count) + 1)
                }
              >
                <CaretLeftIcon />
              </IconButton>
            </div>
          </Title>
        </div>

        <div className="TrainingSplitDayView__day-subtitle-container">
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

        <div className="TrainingSplitDayView__divider" />

        <div className="TrainingSplitDayView__cards">
          {!scheduleView ? (
            <>
              <SplitDayTrainingCard data={day.training_plan_activities} />
              <SplitDayDietCard data={day.diet_plan_day} />
              <SplitDayOtherCard data={day.items} />
            </>
          ) : (
            activities.map((a: any) => (
              <>
                {a.type === 'workout' && (
                  <SplitDayTrainingCard
                    data={a.day}
                    scheduleTime={a.time || 'Not Set'}
                  />
                )}
                {a.type === 'meal' && (
                  <SplitDayDietCard
                    data={a.day}
                    scheduleTime={a.time || 'Not Set'}
                  />
                )}
                {a.type === 'other' && (
                  <SplitDayOtherCard
                    data={a.day}
                    scheduleTime={a.time || 'Not Set'}
                  />
                )}
              </>
            ))
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
          Back to training split overview
        </HeaderLink>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
