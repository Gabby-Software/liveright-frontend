import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import SplitDayWorkoutCard from '../split-day-workout-card/split-day-workout-card.component'
import SplitDayCard, { SplitDayCardProps } from './split-day-card.component'

export default function SplitDayTrainingCard(
  props: Pick<SplitDayCardProps, 'scheduleTime'>
) {
  return (
    <SplitDayCard
      scheduleTime={props.scheduleTime}
      title="High Intensity Training"
      color={getColorCarry('yellow_80')}
      icon={<WorkoutIcon />}
      content={
        <div>
          <SplitDayWorkoutCard />
          <SplitDayWorkoutCard />
        </div>
      }
    />
  )
}
