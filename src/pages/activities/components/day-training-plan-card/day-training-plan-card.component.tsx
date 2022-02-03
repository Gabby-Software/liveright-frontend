import DayCard from '../day-card/day-card.component'
import DayCardAccordion from '../day-card-accordion/day-card-accordion.component'
import { Styles } from './day-training-plan-card.styles'

interface DayTrainingPlanCardProps {
  activity: any
  onExpand?: () => void
  border?: 'both' | 'mobile' | 'desktop'
}

export default function DayTrainingPlanCard({
  activity,
  onExpand,
  border = 'desktop'
}: DayTrainingPlanCardProps) {
  return (
    <DayCard
      title={activity.name}
      onExpand={onExpand}
      border={border}
      content={
        <Styles>
          <div className="day-tp-card__content">
            <div className="day-tp-card__workout">
              <div>
                <DayCardAccordion
                  title={''}
                  count={countExercise(activity.items ?? [])}
                  content={activity.items?.map((row: any) => ({
                    content: !row.is_superset
                      ? [
                          {
                            title: row.data?.name ?? row.name,
                            subtitle: formatExercise(row)
                          }
                        ]
                      : row.data.map((d: any) => ({
                          title: d.name,
                          subtitle: formatExercise(d)
                        }))
                  }))}
                />
              </div>
            </div>
          </div>
        </Styles>
      }
    />
  )
}

function countExercise(items: any[]): string {
  const count = items.reduce(
    (prev: number, item: any) =>
      prev + (item.is_superset ? item.data.length : 1),
    0
  )
  return `${count}`
}

function formatExercise(data: any): string {
  const ex = data.data ?? data
  let result = ''
  if (ex.info?.cardio) {
    if (ex.info?.duration) {
      const times = ex.info.duration.split(':')
      if (times.length === 2) {
        result += `Duration: ${times[0] * 60 + +times[1]}s; `
      }
    }
    if (ex.info?.intensity) {
      result += `Intensity: ${ex.info.intensity}s; `
    }
  } else {
    if (ex.info?.sets) {
      result += `Sets: ${ex.info.sets}; `
    }
    if (ex.info?.reps) {
      result += ` Reps: ${ex.info.reps}; `
    }
    if (ex.info?.rest_interval) {
      result += ` Rest: ${ex?.info.rest_interval}s; `
    }
  }

  return result
}
