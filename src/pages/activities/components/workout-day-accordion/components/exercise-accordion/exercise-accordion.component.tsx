import { Controller, useFormContext, useWatch } from 'react-hook-form'

import Input from '../../../../../../components/form/input/input.component'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { Styles } from './exercise-accrdion.styles'

interface ExerciseAccordionProps {
  name: string
  onRemove: any
}

export default function ExerciseAccordion({
  name,
  onRemove
}: ExerciseAccordionProps) {
  const methods = useFormContext()

  const exerciseName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  return (
    <SubItemAccordion
      title={exerciseName}
      onRemove={onRemove}
      content={
        <Styles>
          <Controller
            name={`${name}.name`}
            render={({ field: { name, value } }) => (
              <Input
                id="Exercise-name"
                label="Exercise name"
                placeholder="1A--"
                value={value}
                onChange={(e) => methods.setValue(name, e.target.value)}
                className="ExerciseAccordion__name"
              />
            )}
          />

          <div className="ExerciseAccordion__controls">
            <Controller
              name={`${name}.info.steps`}
              render={({ field: { name, value } }) => (
                <Input
                  id="Exercise-steps"
                  label="Steps"
                  placeholder="10"
                  value={value}
                  onChange={(e) => methods.setValue(name, e.target.value)}
                />
              )}
            />
            <Controller
              name={`${name}.info.reps`}
              render={({ field: { name, value } }) => (
                <Input
                  id="Exercise-reps"
                  label="Reps"
                  placeholder="10"
                  value={value}
                  onChange={(e) => methods.setValue(name, e.target.value)}
                />
              )}
            />
            <Controller
              name={`${name}.info.tempo`}
              render={({ field: { name, value } }) => (
                <Input
                  id="Exercise-tempo"
                  label="Tempo"
                  placeholder="10"
                  value={value}
                  onChange={(e) => methods.setValue(name, e.target.value)}
                />
              )}
            />
            <Controller
              name={`${name}.info.rest_interval`}
              render={({ field: { name, value } }) => (
                <Input
                  id="Exercise-rest-interval"
                  label="Rest Interval"
                  placeholder="10"
                  value={value}
                  onChange={(e) => methods.setValue(name, e.target.value)}
                />
              )}
            />
          </div>

          <Controller
            name={`${name}.link`}
            render={({ field: { name, value } }) => (
              <Input
                id="Exercise-link"
                label="Link to video/instructions"
                placeholder="https://"
                value={value}
                onChange={(e) => methods.setValue(name, e.target.value)}
              />
            )}
          />
        </Styles>
      }
    />
  )
}
