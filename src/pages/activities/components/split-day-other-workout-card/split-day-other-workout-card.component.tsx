import { Styles } from './split-day-other-workout-card.styles'

export default function SplitDayOtherWorkoutCard() {
  return (
    <Styles>
      <div className="SplitDayOtherWorkoutCard__content">
        <table className="SplitDayOtherWorkoutCard__table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Duration</th>
              <th>Video/Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Squats</td>
              <td>5 min</td>
              <td>ND</td>
            </tr>
            <tr>
              <td>Squats</td>
              <td>5 min</td>
              <td>ND</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Styles>
  )
}
