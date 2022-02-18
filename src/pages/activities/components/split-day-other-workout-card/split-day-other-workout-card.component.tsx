import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { ExerciseMobileCard } from '../split-day-workout-card/workout-mobile-card/workout-mobile-card'
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
          // data.map((item: any, i: number) => {
          //   const exercises = item.is_superset ? item.data : [item.data]
          //   return exercises.map((e: any) => (
          //     <div key={i} className="SplitDayWorkoutCard__content-card">
          //       <p className="SplitDayWorkoutCard__content-card-title">
          //         {e.name}
          //       </p>

          //       <div className="SplitDayWorkoutCard__content-card-cols">
          //         <div className="SplitDayWorkoutCard__content-card-col">
          //           <p className="SplitDayWorkoutCard__content-card-col-name">
          //             Duration
          //           </p>
          //           <p>{e.info?.duration}</p>
          //         </div>
          //         <div className="SplitDayWorkoutCard__content-card-col">
          //           <p className="SplitDayWorkoutCard__content-card-col-name">
          //             Intensity
          //           </p>
          //           <p>{e.info?.intensity}</p>
          //         </div>
          //         <div className="SplitDayWorkoutCard__content-card-col">
          //           <p className="SplitDayWorkoutCard__content-card-col-name">
          //             Heart Rate
          //           </p>
          //           <p>{e.info?.avg_heart_rate}</p>
          //         </div>
          //         <div className="SplitDayWorkoutCard__content-card-col">
          //           <p className="SplitDayWorkoutCard__content-card-col-name">
          //             Schedule
          //           </p>
          //           <p>{e?.info?.schedule}</p>
          //         </div>
          //       </div>
          //     </div>
          //   ))
          // })

          data.map((item: any, i: number) => (
            <ExerciseMobileCard key={i} data={item.data} type="cardio" />
          ))
        ) : (
          <table className="SplitDayOtherWorkoutCard__table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Duration</th>
                <th>Intensity</th>
                <th>Heart Rate</th>
                <th>Schedule</th>
                {/* <th>Video/Link</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, i: number) => {
                const exercises = item.is_superset ? item.data : [item.data]
                return exercises.map((e: any) => (
                  <tr key={i}>
                    <td>{e?.name}</td>
                    <td>{e?.info?.duration}</td>
                    <td>{e?.info?.intensity}</td>
                    <td>{e?.info?.avg_heart_rate}</td>
                    <td>{e?.info?.schedule}</td>
                    {/* <td>{e?.link || 'ND'}</td> */}
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
