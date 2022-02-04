import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import SplitDayWorkoutCard from '../split-day-workout-card/split-day-workout-card.component'
import SplitDayCard from './split-day-card.component'

interface IProps {
  data: any[]
  scheduleTime?: string
  actionComponent?: React.ReactNode
  contentClass?: string
}

export default function SplitDayTrainingCard(props: IProps) {
  const { data, scheduleTime, actionComponent, contentClass } = props
  return (
    <>
      {data?.map((row: any, index: number) => (
        <SplitDayCard
          key={index}
          scheduleTime={scheduleTime}
          title={row.name}
          color={getColorCarry('yellow_80')}
          icon={<WorkoutIcon />}
          actionComponent={actionComponent}
          contentClass={contentClass}
          content={
            <div>
              {/* {data.activities?.map((a: any, idx: number) => ( */}
              <SplitDayWorkoutCard data={row} />
              {/* ))} */}
            </div>
          }
        />
      ))}
    </>
  )
}
