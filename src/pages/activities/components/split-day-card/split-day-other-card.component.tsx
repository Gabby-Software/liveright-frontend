import { ExerciseIcon } from '../../../../assets/media/icons/activities'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import SplitDayOtherWorkoutCard from '../split-day-other-workout-card/split-day-other-workout-card.component'
import SplitDayCard from './split-day-card.component'

interface IProps {
  scheduleTime?: string
  data: any
}

export default function SplitDayOtherCard(props: IProps) {
  const { scheduleTime, data } = props
  return (
    <SplitDayCard
      scheduleTime={scheduleTime}
      title="Other Exercise"
      color={getColorCarry('blue_50')}
      icon={<ExerciseIcon />}
      content={
        <div>
          <SplitDayOtherWorkoutCard data={data} />
        </div>
      }
    />
  )
}
