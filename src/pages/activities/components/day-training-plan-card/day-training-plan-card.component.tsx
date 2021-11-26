import { FoodIcon } from '../../../../assets/media/icons/activities'
import DayCard from '../day-card/day-card.component'
import DayCardListItem from '../day-card-list-item/day-card-list-item.component'
import { Styles } from './day-training-plan-card.styles'

export default function DayTrainingPlanCard() {
  return (
    <DayCard
      content={
        <Styles>
          <div className="day-tp-card__name-container">
            <div className="day-tp-card__name-icon">
              <FoodIcon />
            </div>

            <p className="day-tp-card__name">High Intensity Workouts</p>
          </div>

          <div className="day-tp-card__content">
            <div className="day-tp-card__workout">
              <p className="day-tp-card__workout-title">Workout 1</p>

              <div>
                <DayCardListItem title="Pushups" />
                <DayCardListItem title="Squats" />
                <DayCardListItem title="Situps" />
              </div>
            </div>
          </div>
        </Styles>
      }
    />
  )
}
