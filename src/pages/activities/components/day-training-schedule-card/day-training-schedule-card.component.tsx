import { AddIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DayCard from '../day-card/day-card.component'
import { Styles } from './day-training-schedule-card.styles'

interface ScheduleCardProps {
  data: any
  subtitle: string
}
export default function DayTrainingScheduleCard(props: ScheduleCardProps) {
  const { data, subtitle } = props
  return (
    <DayCard
      border="both"
      title={data.day}
      subtitle={subtitle}
      content={
        <Styles>
          <ListItem time="08.00" title={data.workoutDay.name} type="workout" />
          <ListItem time="09.00" title={data.mealPlanDay.name} type="meal" />
          <ListItem time="10.00" title={data.workoutDay.name} type="meal" />
          <ListItem time="11.00" title="Cardio" type="exercise" />
          <ListItem time="12.00" title="Meal one 2" type="meal" />
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
