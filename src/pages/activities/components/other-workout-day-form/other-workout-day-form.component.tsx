import OtherWorkout from '../workout-day-accordion/components/other-workout/other-workout.component'

interface IProps {
  name: string
}

export default function OtherWorkoutDayForm({ name }: IProps) {
  return <OtherWorkout name={name} />
}
