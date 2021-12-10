import { ClockIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './split-day-workout-card.styles'

export default function SplitDayWorkoutCard() {
  const isMobile = useIsMobile()
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
          {isMobile ? (
            <>
              <div className="SplitDayWorkoutCard__content-card">
                <p className="SplitDayWorkoutCard__content-card-title">
                  Squats
                </p>

                <div className="SplitDayWorkoutCard__content-card-cols">
                  {['Sets', 'Reps', 'Tempo', 'Rest Interval', 'Video/Link'].map(
                    (row) => (
                      <div
                        className="SplitDayWorkoutCard__content-card-col"
                        key={row}
                      >
                        <p className="SplitDayWorkoutCard__content-card-col-name">
                          {row}
                        </p>
                        <p>1</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </Styles>
  )
}
