import { ClockIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './split-day-workout-card.styles'

interface IProps {
  data: any
}

const EXERCISE_INFO_KEY_LABEL: { [key: string]: string } = {
  sets: 'Sets',
  reps: 'Reps',
  tempo: 'Tempo',
  rest_interval: 'Rest Interval'
}

export default function SplitDayWorkoutCard({ data }: IProps) {
  const isMobile = useIsMobile()
  return (
    <Styles>
      <div className="SplitDayWorkoutCard__card">
        <p className="SplitDayWorkoutCard__title">{data.name}</p>
        <p className="SplitDayWorkoutCard__subtitle">
          <ClockIcon />
          {data.time ? `Scheduled for ${data.time}` : 'Not Scheduled'}
        </p>
      </div>
      <div className="SplitDayWorkoutCard__card">
        <div className="SplitDayWorkoutCard__content">
          {isMobile ? (
            data.items?.map((item: any, i: number) => {
              const exercises = item.is_superset ? item.data : [item.data]
              return exercises.map((e: any) => (
                <div key={i} className="SplitDayWorkoutCard__content-card">
                  <p className="SplitDayWorkoutCard__content-card-title">
                    {e.name}
                  </p>

                  <div className="SplitDayWorkoutCard__content-card-cols">
                    {Object.keys(EXERCISE_INFO_KEY_LABEL).map((k) => (
                      <div
                        className="SplitDayWorkoutCard__content-card-col"
                        key={k}
                      >
                        <p className="SplitDayWorkoutCard__content-card-col-name">
                          {EXERCISE_INFO_KEY_LABEL[k]}
                        </p>
                        <p>{e.info?.[k]}</p>
                      </div>
                    ))}
                    <div className="SplitDayWorkoutCard__content-card-col">
                      <p className="SplitDayWorkoutCard__content-card-col-name">
                        Video/Link
                      </p>
                      <a
                        href={e.link || ''}
                        target="_blank"
                        rel="noreferrer"
                        className="SplitDayWorkoutCard__content-card-col-link"
                      >
                        {e.link || 'ND'}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            })
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
                {data.items?.map((item: any, i: number) => {
                  const exercises = item.is_superset ? item.data : [item.data]
                  return exercises.map((e: any) => (
                    <tr key={i}>
                      <td>{e?.name}</td>
                      <td>{e?.info?.sets}</td>
                      <td>{e?.info?.reps}</td>
                      <td>{e?.info?.tempo}</td>
                      <td>{e?.info?.rest_interval}</td>
                      <td>{e?.link || 'ND'}</td>
                    </tr>
                  ))
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Styles>
  )
}
