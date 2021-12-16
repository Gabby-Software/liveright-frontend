import get from 'lodash.get'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import Input from '../../../../../../components/form/input/input.component'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { PrefixStyles, Styles } from './exercise-accrdion.styles'

interface ExerciseAccordionProps {
  name: string
  onRemove: any
  borderBottom?: boolean
  prefix?: boolean
}

export default function ExerciseAccordion({
  name,
  onRemove,
  borderBottom,
  prefix
}: ExerciseAccordionProps) {
  const methods = useFormContext()

  const exerciseName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const onChange = (name: string, value: string) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  return (
    <SubItemAccordion
      prefix={prefix ? <PrefixStyles>Exercises</PrefixStyles> : undefined}
      borderBottom={borderBottom}
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
                onChange={(e) => onChange(name, e.target.value)}
                className="ExerciseAccordion__name"
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            )}
          />

          <div className="ExerciseAccordion__controls">
            <Controller
              name={`${name}.info.sets`}
              render={({ field: { name, value } }) => (
                <Input
                  id="Exercise-sets"
                  label="Steps"
                  placeholder="10"
                  value={value}
                  onChange={(e) => onChange(name, e.target.value)}
                  error={get(errors, name)}
                  ErrorProps={{ size: 'sm' }}
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
                  onChange={(e) => onChange(name, e.target.value)}
                  error={get(errors, name)}
                  ErrorProps={{ size: 'sm' }}
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
                  onChange={(e) => onChange(name, e.target.value)}
                  error={get(errors, name)}
                  ErrorProps={{ size: 'sm' }}
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
                  onChange={(e) => onChange(name, e.target.value)}
                  error={get(errors, name)}
                  ErrorProps={{ size: 'sm' }}
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
                onChange={(e) => onChange(name, e.target.value)}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            )}
          />
        </Styles>
      }
    />
  )
}
