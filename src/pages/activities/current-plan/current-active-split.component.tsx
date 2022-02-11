import moment from 'moment'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  CalendarIcon,
  CaretLeftIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../assets/media/icons'
import { ExerciseIcon } from '../../../assets/media/icons/activities'
import Button from '../../../components/buttons/button/button.component'
import IconButton from '../../../components/buttons/icon-button/icon-button.component'
import { Routes } from '../../../enums/routes.enum'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { getColorCarry } from '../../../pipes/theme-color.pipe'
import CurrentPlanAccordion from '../components/current-plan-accordion/current-plan-accordion.component'
import CurrentPlanCard from '../components/current-plan-card/current-plan-card.component'

export const DATA = {
  workout: {
    icon: <WorkoutIcon />,
    color: getColorCarry('orange_50'),
    action: 'Exercises'
  },
  meal: {
    icon: <FoodIcon />,
    color: getColorCarry('primary_v2'),
    action: 'kcal'
  },
  other: {
    icon: <ExerciseIcon />,
    color: getColorCarry('blue_50'),
    action: 'See Details'
  }
}

interface CurrentActiveSplitProps {
  revision: any
}

export default function CurrentActiveSplit({
  revision
}: CurrentActiveSplitProps) {
  const isMobile = useIsMobile()
  const [index, setIndex] = useState<number>(0)

  const { activities } = useMemo(() => {
    const day = revision?.days?.[index]
    const workoutActivites: any[] =
      day?.training_plan_activities?.map((a: any) => ({
        day: {
          activities: [a],
          name: a.name,
          items: a.items
        },
        time: a.time,
        type: 'workout'
      })) || []
    const mealActivites: any[] =
      day?.diet_plan_day?.activities?.map((a: any) => ({
        day: {
          activities: [a],
          name: a.name,
          total_target: a.total_target,
          items: a.items
        },
        time: a.time,
        type: 'meal'
      })) || []
    const exerciseActivities: any[] =
      day?.items?.map((a: any) => ({
        day: a.data,
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

  const calendarToggle = (
    <div className="CurrentPlan__picker-btn-container">
      <IconButton
        size="sm"
        className="CurrentPlan__picker-btn"
        onClick={() =>
          setIndex((index - 1 + revision.days_count) % revision.days_count)
        }
      >
        <CaretLeftIcon />
      </IconButton>
      <IconButton
        size="sm"
        className="CurrentPlan__picker-btn"
        onClick={() => setIndex((index + 1) % revision.days_count)}
      >
        <CaretLeftIcon />
      </IconButton>
    </div>
  )

  const openCalendarBtn = (
    <Link to={Routes.CALENDAR}>
      <Button variant="text" size="sm">
        <CalendarIcon />
        <span>Open Calender</span>
      </Button>
    </Link>
  )

  const dateString1 = moment(revision.scheduled_start_on, 'DD-MM-YYYY')
    .add(index, 'days')
    .isSame(moment(new Date().toISOString(), 'DD-MM-YYYY'), 'date')
    ? 'Today'
    : `Day ${index + 1}`

  const dateString2 = moment(revision.scheduled_start_on)
    .add(index, 'day')
    .format('MMM DD')

  return (
    <>
      {isMobile ? (
        <div className="CurrentPlan__picker-container">
          <div className="CurrentPlan__picker-row">
            <span className="CurrentPlan__picker-row-title">
              {dateString1},{' '}
            </span>
            {openCalendarBtn}
          </div>
          <div className="CurrentPlan__picker-row">
            <span className="CurrentPlan__picker-row-subtitle">
              {dateString2}
            </span>
            {calendarToggle}
          </div>
        </div>
      ) : (
        <div className="CurrentPlan__picker-container">
          <div className="CurrentPlan__picker">
            <p className="CurrentPlan__picker-title">
              {dateString1}, <span>{dateString2}</span>
            </p>
            {calendarToggle}
          </div>

          {openCalendarBtn}
        </div>
      )}

      <div className="CurrentPlan__divider" />

      {activities.length === 0 ? (
        <div className="CurrentPlan__no-activity">
          {"You don't have any activities for today :("}
        </div>
      ) : (
        activities.map((row, index) =>
          isMobile ? (
            <CurrentPlanAccordion
              key={index}
              data={row.day}
              type={row.type}
              scheduleTime={row.time || 'Not Set'}
            />
          ) : (
            <CurrentPlanCard
              key={index}
              data={row.day}
              type={row.type}
              scheduleTime={row.time?.slice(0, 5) || 'Not Set'}
            />
          )
        )
      )}
    </>
  )
}
