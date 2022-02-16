import { AddIcon } from '../../../../assets/media/icons'
import { FoodIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DayCard from '../day-card/day-card.component'
import DayCardListItem from '../day-card-list-item/day-card-list-item.component'
import DayDietTargetCard from '../day-diet-target-card/day-diet-target-card.component'
import { Styles } from './day-diet-plan-card.styles'

interface DayDietPlanCardProps {
  day: any
  onExpand?: () => void
  onMealClick: (meal: any) => void
  border?: 'both' | 'mobile' | 'desktop'
}

export default function DayDietPlanCard({
  day,
  onExpand,
  onMealClick,
  border = 'desktop'
}: DayDietPlanCardProps) {
  console.log('day', day)
  return (
    <DayCard
      title={day?.name}
      onExpand={!day?.is_day_target ? onExpand : false}
      border={border}
      content={
        <Styles>
          {!day?.is_day_target ? (
            day?.activities?.map((row: any) => (
              <div className="DayDietPlanCard__content" key={row._id}>
                <div className="DayDietPlanCard__name-container">
                  <div className="DayDietPlanCard__name">
                    <div className="DayDietPlanCard__name-icon">
                      <FoodIcon />
                    </div>

                    <p className="DayDietPlanCard__name-name">{row.name}</p>
                  </div>

                  <IconButton size="sm" onClick={() => onMealClick(row)}>
                    <AddIcon />
                  </IconButton>
                </div>

                <div className="day-tp-card__content">
                  <div>
                    {row.items?.map((row: any) => (
                      <DayCardListItem
                        key={row._id}
                        title={row.data?.name || '-'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <DayDietTargetCard data={day?.custom_target} />
          )}
        </Styles>
      }
    />
  )
}
