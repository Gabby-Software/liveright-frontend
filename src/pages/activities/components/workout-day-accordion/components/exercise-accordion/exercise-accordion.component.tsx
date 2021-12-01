import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { Styles } from './exercise-accrdion.styles'

export default function ExerciseAccordion() {
  return (
    <SubItemAccordion
      title="Pushup"
      content={
        <Styles>
          <Select
            id="ExerciseAccordion-name"
            options={[]}
            label="Exercise name"
            placeholder="Pushup"
            className="ExerciseAccordion__name"
          />

          <div className="ExerciseAccordion__controls">
            <Input id="ExerciseAccordion-sets" label="Sets" placeholder="-" />
            <Input id="ExerciseAccordion-reps" label="Reps" placeholder="-" />
            <Input id="ExerciseAccordion-tempo" label="Tempo" placeholder="-" />
            <Input
              id="ExerciseAccordion-Rest-Interval"
              label="Rest Interval"
              placeholder="-"
            />
          </div>

          <Input
            id="ExerciseAccordion-Link-to-video/instructions"
            label="Link to video/instructions"
            placeholder="-"
          />
        </Styles>
      }
    />
  )
}
