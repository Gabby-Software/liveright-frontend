import { AddIcon } from '../../../../assets/media/icons'
import { FoodIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DayCard from '../day-card/day-card.component'
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
                <p className="day-tp-card__workout-exercise">
                  <span>Pushups</span>

                  <IconButton size="sm">
                    <AddIcon />
                  </IconButton>
                </p>
                <p className="day-tp-card__workout-exercise">
                  <span>Squats</span>

                  <IconButton size="sm">
                    <AddIcon />
                  </IconButton>
                </p>
                <p className="day-tp-card__workout-exercise">
                  <span>Situps</span>

                  <IconButton size="sm">
                    <AddIcon />
                  </IconButton>
                </p>
              </div>
            </div>
          </div>
        </Styles>
      }
    />
  )
}
