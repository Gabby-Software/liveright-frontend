import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './split-day-other-workout-card.styles'

export default function SplitDayOtherWorkoutCard() {
  const isMobile = useIsMobile()
  return (
    <Styles>
      <div className="SplitDayOtherWorkoutCard__content">
        {isMobile ? (
          <>
            <div className="SplitDayOtherWorkoutCard__content-card">
              <p className="SplitDayOtherWorkoutCard__content-card-title">
                Squats
              </p>

              <div className="SplitDayOtherWorkoutCard__content-card-cols">
                {['Sets', 'Video/Link'].map((row) => (
                  <div
                    className="SplitDayOtherWorkoutCard__content-card-col"
                    key={row}
                  >
                    <p className="SplitDayOtherWorkoutCard__content-card-col-name">
                      {row}
                    </p>
                    <p>1</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
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
        )}
      </div>
    </Styles>
  )
}
