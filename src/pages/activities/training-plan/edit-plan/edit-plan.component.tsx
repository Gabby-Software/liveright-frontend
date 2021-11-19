import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import Input from '../../../../components/form/input/input.component'
import { Title } from '../../../../components/typography'
import Counter from '../../components/counter/counter.component'
import WorkoutDayAccordion from '../../components/workout-day-accordion/workout-day-accordion.component'
import { Styles } from './edit-plan.styles'

interface EditPlanProps {
  onClose: () => void
}

export default function EditPlan({ onClose }: EditPlanProps) {
  return (
    <Styles>
      <Card className="edit-training-plan__overview">
        <GoBack spacing={4} onClick={onClose}>
          Go Back to Overview
        </GoBack>

        <div className="edit-training-plan__header">
          <Title>Edit Training Plan</Title>

          <div>
            <Button onClick={onClose}>Save</Button>
          </div>
        </div>

        <div className="edit-training-plan__controls">
          <Input
            id="edit-training-plan-name"
            label="Training Plan Name"
            placeholder="Name"
          />

          <Counter />
        </div>
      </Card>

      <WorkoutDayAccordion />
      <WorkoutDayAccordion />
    </Styles>
  )
}
