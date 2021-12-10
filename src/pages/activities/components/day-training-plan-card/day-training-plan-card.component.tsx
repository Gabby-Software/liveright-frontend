import DayCard from '../day-card/day-card.component'
import DayCardAccordion from '../day-card-accordion/day-card-accordion.component'
import { Styles } from './day-training-plan-card.styles'

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
