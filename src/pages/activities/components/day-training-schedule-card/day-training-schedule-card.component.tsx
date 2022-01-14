import { useMemo } from 'react'

import { AddIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DayCard from '../day-card/day-card.component'
import { Styles } from './day-training-schedule-card.styles'

interface ScheduleCardProps {
  data: any
  subtitle: string
  day?: string
  onExpand?: () => void
}

interface DailyActivity {
  title: string
  time: string
  type: string
}

export default function DayTrainingScheduleCard(props: ScheduleCardProps) {
  const { data, day, subtitle, onExpand } = props

  const activities = useMemo(() => {
    const workoutActivites: DailyActivity[] =
      data?.training_plan_day?.activities?.map((a: any) => ({
        title: a.name,
        time: a.time,
        type: 'workout'
      })) || []
    const mealActivites: DailyActivity[] =
      data?.diet_plan_day?.activities?.map((a: any) => ({
        title: a.name,
        time: a.time,
        type: 'meal'
      })) || []
    const exerciseActivities: DailyActivity[] =
      data?.items?.map((a: any) => ({
        title: a.name,
        time: a.time,
        type: 'exercise'
      })) || []

    const activites = workoutActivites.concat(mealActivites, exerciseActivities)
    activites.sort(
      (a, b) =>
        Date.parse('1970/01/01 ' + a.time || '00:00') -
        Date.parse('1970/01/01 ' + b.time || '00:00')
    )
    return activites
  }, [data])

  return (
    <DayCard
      border="both"
      title={data.day || day}
      onExpand={onExpand}
      subtitle={subtitle}
      content={
        <Styles>
          {activities.map((a, i) => (
            <ListItem
              key={i}
              time={a.time || '--:--'}
              title={a.title}
              type={a.type}
            />
          ))}
        </Styles>
      }
    />
  )
}

interface ListItemProps {
  time: string
  title: string
  type: string
}

function ListItem({ time, title, type }: ListItemProps) {
  return (
    <div className="DayTrainingScheduleCard__row" data-type={type}>
      <div className="DayTrainingScheduleCard__row-content">
        <p className="DayTrainingScheduleCard__row-time">{time}</p>
        <p>{title}</p>
      </div>

      <IconButton size="sm">
        <AddIcon />
      </IconButton>
    </div>
  )
}
