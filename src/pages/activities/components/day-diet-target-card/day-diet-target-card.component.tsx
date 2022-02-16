import { Styles } from './day-diet-target-card.styles'

interface DayDietTargetCardProps {
  data: any
}

export default function DayDietTargetCard({ data }: DayDietTargetCardProps) {
  const total =
    data &&
    Object.keys(data)
      .filter((f) => f !== 'calories')
      .map((m) => data[m])
      .reduce((a, b) => {
        console.log('datasss', data[b])
        if (data[b] !== 'calories') return Number(a) + Number(b)
      })

  return (
    data && (
      <Styles>
        <div className="DayDietTargetCard__item">
          <p>Protein</p>
          <p>
            {data?.proteins}g / {total || 0}g
          </p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Fat</p>
          <p>
            {data?.fat}g / {total || 0}g
          </p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Net Carbs</p>
          <p>
            {data?.net_carbs}g / {total || 0}g
          </p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Sugar</p>
          <p>
            {data?.sugar}g / {total || 0}g
          </p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Fiber</p>
          <p>
            {data?.fiber}g / {total || 0}g
          </p>
        </div>
        <div className="DayDietTargetCard__item">
          <p>Calories</p>
          <p>{data?.calories} kcal</p>
        </div>
      </Styles>
    )
  )
}
