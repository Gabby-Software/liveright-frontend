import { ClockIcon } from '../../../../assets/media/icons'
import { Styles } from './split-day-workout-card.styles'

export default function SplitDayWorkoutCard() {
  return (
    <Styles>
      <div className="SplitDayWorkoutCard__card">
        <p className="SplitDayWorkoutCard__title">High Intensity Workout</p>
        <p className="SplitDayWorkoutCard__subtitle">
          <ClockIcon />
          Scheduled for 08.00
        </p>
      </div>
      <div className="SplitDayWorkoutCard__card">
        <div className="SplitDayWorkoutCard__content">
          <table className="SplitDayWorkoutCard__table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Tempo</th>
                <th>Rest Interval</th>
                <th>Video/Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Squats</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>5 min</td>
                <td>ND</td>
              </tr>
              <tr>
                <td>Squats</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>5 min</td>
                <td>ND</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Styles>
  )
}
