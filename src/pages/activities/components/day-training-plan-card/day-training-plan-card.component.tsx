import DayCard from '../day-card/day-card.component'
import DayCardAccordion from '../day-card-accordion/day-card-accordion.component'
import { Styles } from './day-training-plan-card.styles'

// const CONTENT = [
//   {
//     content: [
//       {
//         title: 'Pushups',
//         subtitle: '4 sets of 10 Reps with 2 min break'
//       }
//     ]
//   },
//   {
//     content: [
//       {
//         title: 'Pushups',
//         subtitle: '4 sets of 10 Reps with 2 min break'
//       }
//     ]
//   },
//   {
//     content: [
//       {
//         title: '1A - Pushups',
//         subtitle: '4 sets of 10 Reps with 2 min break'
//       },
//       {
//         title: '1B - Pushups',
//         subtitle: '4 sets of 10 Reps with 2 min break'
//       }
//     ]
//   }
// ]

interface DayTrainingPlanCardProps {
  day: any
}

export default function DayTrainingPlanCard({ day }: DayTrainingPlanCardProps) {
  return (
    <DayCard
      title={day.name}
      content={
        <Styles>
          <div className="day-tp-card__content">
            <div className="day-tp-card__workout">
              <div>
                {day.activities?.map((row: any) => (
                  <DayCardAccordion
                    key={row._id}
                    title={row.name}
                    count={row.items?.length}
                    content={row.items?.map((row: any) => ({
                      content: [
                        {
                          title: row.name,
                          subtitle: `Steps: ${row.info.steps}; Reps: ${row.info.reps}; Rest: ${row.info.rest_interval};`
                        }
                      ]
                    }))}
                  />
                ))}
              </div>
            </div>
          </div>
        </Styles>
      }
    />
  )
}
