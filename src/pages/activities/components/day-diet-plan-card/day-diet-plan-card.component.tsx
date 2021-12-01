import { FoodIcon } from '../../../../assets/media/icons/activities'
import DayCard from '../day-card/day-card.component'
import DayCardListItem from '../day-card-list-item/day-card-list-item.component'
import { Styles } from './day-diet-plan-card.styles'

export default function DayDietPlanCard() {
  return (
    <DayCard
      title="Day 1"
      content={
        <Styles>
          <div className="DayDietPlanCard__name-container">
            <div className="DayDietPlanCard__name-icon">
              <FoodIcon />
            </div>

            <p className="DayDietPlanCard__name">Low Carbs Day</p>
          </div>

          <div className="day-tp-card__content">
            <div>
              <DayCardListItem title="Lunch" />
              <DayCardListItem title="Dinner" />
              <DayCardListItem title="Snack" />
            </div>
          </div>
        </Styles>
      }
    />
  )
}
