import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import Input from '../../../../components/form/input/input.component'
import { Title } from '../../../../components/typography'
import Counter from '../../components/counter/counter.component'
import MealDayAccordion from '../../components/meal-day-accordion/meal-day-accordion.component'
import { Styles } from './edit-plan.styles'

interface EditDietPlanProps {
  onClose: () => void
}

export default function EditDietPlan({ onClose }: EditDietPlanProps) {
  return (
    <Styles>
      <Card className="EditDietPlan__overview">
        <GoBack spacing={4} onClick={onClose}>
          Go Back to Overview
        </GoBack>

        <div className="EditDietPlan__header">
          <Title>Edit Training Plan</Title>

          <div>
            <Button onClick={onClose}>Save</Button>
          </div>
        </div>

        <div className="EditDietPlan__controls">
          <Input
            id="edit-training-plan-name"
            label="Diet Plan Name"
            placeholder="Name"
          />

          <Counter />
        </div>
      </Card>

      <MealDayAccordion />
      <MealDayAccordion />
    </Styles>
  )
}
