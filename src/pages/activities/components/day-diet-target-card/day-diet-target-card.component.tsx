import { Styles } from './day-diet-target-card.styles'

interface DayDietTargetCardProps {
  data: any
}

export default function DayDietTargetCard({ data }: DayDietTargetCardProps) {
  return (
    data && (
      <Styles>
        <div className="DayDietTargetCard__item">
          <p></p>
          <p>Target</p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Protein</p>
          <p>{data?.proteins} g</p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Fat</p>
          <p>{data?.fat} g</p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Net Carbs</p>
          <p>{data?.net_carbs} g</p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Sugar</p>
          <p>{data?.sugar} g</p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Fiber</p>
          <p>{data?.fiber} g</p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Calories</p>
          <p>{data?.calories} kcal</p>
        </div>
      </Styles>
    )
  )
}
