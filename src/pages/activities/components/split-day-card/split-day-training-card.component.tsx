import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import SplitDayWorkoutCard from '../split-day-workout-card/split-day-workout-card.component'
import SplitDayCard from './split-day-card.component'

interface IProps {
  data: any
  scheduleTime?: string
}

export default function SplitDayTrainingCard(props: IProps) {
  const { data, scheduleTime } = props
  return (
    <SplitDayCard
      scheduleTime={scheduleTime}
      title={data.name}
      color={getColorCarry('yellow_80')}
      icon={<WorkoutIcon />}
      content={
        <div>
          {data.activities?.map((a: any, idx: number) => (
            <SplitDayWorkoutCard key={idx} data={a} />
          ))}
        </div>
      }
    />
  )
}
