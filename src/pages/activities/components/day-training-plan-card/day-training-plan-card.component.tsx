import DayCard from '../day-card/day-card.component'
import DayCardAccordion from '../day-card-accordion/day-card-accordion.component'
import { Styles } from './day-training-plan-card.styles'

interface DayTrainingPlanCardProps {
  day: any
  onExpand?: () => void
}

export default function DayTrainingPlanCard({
  day,
  onExpand
}: DayTrainingPlanCardProps) {
  return (
    <DayCard
      title={day.name}
      onExpand={onExpand}
      content={
        <Styles>
          <div className="day-tp-card__content">
            <div className="day-tp-card__workout">
              <div>
                {day.activities.map((row: any) => (
                  <DayCardAccordion
                    key={row._id}
                    title={row.name}
                    count={row.items?.length}
                    content={row.items?.map((row: any) => ({
                      content: !row.is_superset
                        ? [
                            {
                              title: row.data?.name ?? row.name,
                              subtitle: row.data
                                ? `Sets: ${row.data.info?.sets}; Reps: ${row.data.info?.reps}; Rest: ${row.data.info?.rest_interval};`
                                : `Sets: ${row.info?.sets}; Reps: ${row.info?.reps}; Rest: ${row.info?.rest_interval};`
                            }
                          ]
                        : row.data.map((d: any) => ({
                            title: d.name,
                            subtitle: `Sets: ${d.info?.sets}; Reps: ${d?.info?.reps}; Rest: ${d?.info?.rest_interval};`
                          }))
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
