import { ExerciseIcon } from '../../../../assets/media/icons/activities'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import SplitDayOtherWorkoutCard from '../split-day-other-workout-card/split-day-other-workout-card.component'
import SplitDayCard, { SplitDayCardProps } from './split-day-card.component'

export default function SplitDayOtherCard(
  props: Pick<SplitDayCardProps, 'scheduleTime'>
) {
  return (
    <SplitDayCard
      scheduleTime={props.scheduleTime}
      title="Other Exercise Cardio Max"
      color={getColorCarry('blue_50')}
      icon={<ExerciseIcon />}
      content={
        <div>
          <SplitDayOtherWorkoutCard />
        </div>
      }
    />
  )
}
