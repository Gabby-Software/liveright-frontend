import { ClockIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './split-day-workout-card.styles'
import ExerciseMobileCards from './workout-mobile-card/workout-mobile-card'

interface IProps {
  data: any
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
            <ExerciseMobileCards data={data} />
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
