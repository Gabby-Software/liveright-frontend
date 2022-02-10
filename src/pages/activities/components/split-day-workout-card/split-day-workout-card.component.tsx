// import { ClockIcon } from '../../../../assets/media/icons'
import { VideoOutlinedIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './split-day-workout-card.styles'
import ExerciseMobileCards from './workout-mobile-card/workout-mobile-card'

interface IProps {
  data: any
}

export default function SplitDayWorkoutCard({ data }: IProps) {
  const isMobile = useIsMobile()

  const getLink = (link: string) => {
    return link ? (
      <a
        href={/^https?:\/\//i.test(link) ? link : `https://${link}`}
        target="_blank"
        rel="noreferrer"
      >
        <VideoOutlinedIcon /> View Video
      </a>
    ) : (
      '-'
    )
  }

  const getDummySupersetRow = (name: string) => ({
    name: name,
    info: {
      sets: ' ',
      reps: ' ',
      tempo: ' ',
      rest_interval: ' ',
      duration: ' ',
      intensity: ' '
    }
  })

  return (
    <Styles>
      {/* <div className="SplitDayWorkoutCard__card">
        <p className="SplitDayWorkoutCard__title">{data.name}</p>
        <p className="SplitDayWorkoutCard__subtitle">
          <ClockIcon />
          {data.time ? `Scheduled for ${data.time}` : 'Not Scheduled'}
        </p>
      </div> */}
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
                  <th>Duration</th>
                  <th>Intensity</th>
                  <th>Video/Link</th>
                </tr>
              </thead>
              <tbody>
                {data.items?.map((item: any, i: number) => {
                  const exercises = item.is_superset
                    ? [getDummySupersetRow(`${i + 1} - Superset`), ...item.data]
                    : [item.data]
                  return exercises.map((e: any, idx: number) => (
                    <tr key={i}>
                      <td
                        className={
                          item.is_superset &&
                          idx !== 0 &&
                          'SplitDayWorkoutCard__table-indent'
                        }
                      >
                        {e?.name}
                      </td>
                      <td>
                        {e?.info?.type === 'strength'
                          ? e?.info?.sets || '-'
                          : ''}
                      </td>
                      <td>
                        {e?.info?.type === 'strength'
                          ? e?.info?.reps || '-'
                          : ''}
                      </td>
                      <td>
                        {e?.info?.type === 'strength'
                          ? e?.info?.tempo || '-'
                          : ''}
                      </td>
                      <td>
                        {e?.info?.type === 'strength'
                          ? e?.info?.rest_interval || '-'
                          : ''}
                      </td>
                      <td>
                        {e?.info?.type === 'cardio'
                          ? e?.info?.duration || '-'
                          : ''}
                      </td>
                      <td>
                        {e?.info?.type === 'cardio'
                          ? e?.info?.intensity || '-'
                          : ''}
                      </td>
                      <td>{getLink(e.link)}</td>
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
