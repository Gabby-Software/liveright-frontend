import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './split-day-other-workout-card.styles'

interface IProps {
  data: any
}

export default function SplitDayOtherWorkoutCard({ data }: IProps) {
  const isMobile = useIsMobile()
  return (
    <Styles>
      <div className="SplitDayOtherWorkoutCard__content">
        {isMobile ? (
          data.map((item: any, i: number) => {
            const exercises = item.is_superset ? item.data : [item.data]
            return exercises.map((e: any) => (
              <div key={i} className="SplitDayWorkoutCard__content-card">
                <p className="SplitDayWorkoutCard__content-card-title">
                  {e.name}
                </p>

                <div className="SplitDayWorkoutCard__content-card-cols">
                  <div className="SplitDayWorkoutCard__content-card-col">
                    <p className="SplitDayWorkoutCard__content-card-col-name">
                      Sets
                    </p>
                    <p>{e.info?.sets}</p>
                  </div>
                  <div className="SplitDayWorkoutCard__content-card-col">
                    <p className="SplitDayWorkoutCard__content-card-col-name">
                      Video/Link
                    </p>
                    <p>{e.link || 'ND'}</p>
                  </div>
                </div>
              </div>
            ))
          })
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
              {data.map((item: any, i: number) => {
                const exercises = item.is_superset ? item.data : [item.data]
                return exercises.map((e: any) => (
                  <tr key={i}>
                    <td>{e?.name}</td>
                    <td>{e?.info?.sets}</td>
                    <td>{e?.link || 'ND'}</td>
                  </tr>
                ))
              })}
            </tbody>
          </table>
        )}
      </div>
    </Styles>
  )
}
