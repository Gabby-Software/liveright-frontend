import { FoodIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/card/card.style'
import { Title } from '../../../../components/typography'
import EmptyPlanCard from '../../components/empty-plan-card/empty-plan-card.component'
import { Styles } from './empty-plan.styles'

export default function EmptyPlan() {
  return (
    <Styles>
      <Card>
        <Title className="EmptyPlan__title">Current Diet Plan</Title>
        <EmptyPlanCard
          Icon={FoodIcon}
          text="There is no diet plan yet..."
          action={<Button>Create Edit Plan</Button>}
        />
      </Card>
    </Styles>
  )
}
