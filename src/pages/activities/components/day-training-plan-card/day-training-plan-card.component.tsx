import DayCard from '../day-card/day-card.component'
import DayCardAccordion from '../day-card-accordion/day-card-accordion.component'
import { Styles } from './day-training-plan-card.styles'

const CONTENT = [
  {
    content: [
      {
        title: 'Pushups',
        subtitle: '4 sets of 10 Reps with 2 min break'
      }
    ]
  },
  {
    content: [
      {
        title: 'Pushups',
        subtitle: '4 sets of 10 Reps with 2 min break'
      }
    ]
  },
  {
    content: [
      {
        title: '1A - Pushups',
        subtitle: '4 sets of 10 Reps with 2 min break'
      },
      {
        title: '1B - Pushups',
        subtitle: '4 sets of 10 Reps with 2 min break'
      }
    ]
  }
]

export default function DayTrainingPlanCard() {
  return (
    <DayCard
      title="High Intensity Workouts"
      content={
        <Styles>
          <div className="day-tp-card__content">
            <div className="day-tp-card__workout">
              <div>
                {[1, 2, 3].map((row) => (
                  <DayCardAccordion
                    key={row}
                    title="Workout One"
                    count="3"
                    content={CONTENT}
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
