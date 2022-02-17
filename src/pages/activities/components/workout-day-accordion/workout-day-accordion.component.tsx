import { get } from 'lodash'
import { useMemo } from 'react'
import {
  Controller,
  // useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'

// import { useParams } from 'react-router'
import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import AutoCompleteInput from '../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
// import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import TimePicker from '../../../../components/form/time-picker/time-picker.component'
// import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import useTemplateWorkouts from '../../../../hooks/api/templates/workouts/useTemplateWorkouts'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { getUniqueItemsByProperties } from '../../../../utils/arrays'
import DayAccordion from '../day-accordion/day-accordion.component'
import WorkoutDayForm from '../workout-day-form/workout-day-form.component'
import { Styles } from './workout-day-accordion.styles'

interface WorkoutDayAccordionProps {
  index: number
  onRemove: any
  editDay?: number
  defaultOpened?: boolean
}

export default function WorkoutDayAccordion({
  index,
  onRemove,
  defaultOpened
}: WorkoutDayAccordionProps) {
  // const { clientId, id, revisionId } = useParams<any>()
  const methods = useFormContext()

  // const exercisesArray = useFieldArray({
  //   control: methods.control,
  //   name: `activities.${index}`
  // })

  // const days = useWatch({
  //   name: `days`,
  //   control: methods.control
  // })

  const activities = useWatch({
    name: `activities`,
    control: methods.control
  })

  // const { revision } = useTrainingPlan({
  //   clientId,
  //   id: id,
  //   revisionId
  // })

  const { workouts } = useTemplateWorkouts()

  const { errors } = methods.formState

  const workoutName = useWatch({
    name: `activities.${index}.name`,
    control: methods.control
  })

  const name = `activities.${index}.items`

  // const onChange = (name: string, value: any) => {
  //   methods.setValue(name, value, { shouldValidate: true })
  // }

  const onWorkoutNameSelected = (value: string) => {
    console.log('onWorkoutNameSelected', value)
  }

  const nameOptions = useMemo(() => {
    const planOptions = activities
      ?.filter(
        (w: any) =>
          w?.name?.toLowerCase()?.includes(workoutName?.toLowerCase()) &&
          w?.name !== workoutName
      )
      ?.map((w: any) => ({
        label: w.name,
        value: w.name
      }))

    const templateOptions = workouts
      ?.filter((w: any) =>
        w?.name?.toLowerCase()?.includes(workoutName?.toLowerCase())
      )
      .map((w: any) => ({
        label: w.name,
        value: w.name
      }))

    const options = []

    if (planOptions?.length) {
      options.push({
        label: 'From this Training Plan',
        options: getUniqueItemsByProperties(planOptions, ['label'])
      })
    }

    if (templateOptions?.length) {
      options.push({
        label: 'From Templates',
        options: getUniqueItemsByProperties(templateOptions, ['label'])
      })
    }

    return options.length ? options : []
  }, [activities, workoutName])

  return (
    <DayAccordion
      title={workoutName}
      icon={<WorkoutIcon />}
      iconColor={getColorCarry('orange_60')}
      onRemove={onRemove}
      error={get(errors, `activities.${index}`) ? 'Enter all fields' : ''}
      defaultOpen={defaultOpened}
    >
      <Styles>
        <div className="WorkoutDayAccordion__header">
          <Controller
            name={`activities.${index}.name`}
            render={({ field: { name, value } }) => (
              // <Input
              //   id="WorkoutDayAccordion-name"
              //   label="Workout Name"
              //   placeholder="Name"
              //   className="WorkoutDayAccordion__name-input"
              //   value={value}
              //   onChange={(e) => onChange(name, e.target.value)}
              //   error={get(errors, name)}
              // />
              <AutoCompleteInput
                id="WorkoutDayAccordion-name"
                label="Workout Name"
                placeholder="Name"
                value={value === '' ? null : value}
                onChange={(value) => methods.setValue(name, value)}
                onSelect={onWorkoutNameSelected}
                options={nameOptions}
                error={get(errors, name)}
              />
            )}
          />

          <Controller
            name={`activities.${index}.time`}
            render={({ field: { name, value } }) => (
              <TimePicker
                id="Workout-time"
                label="Schedule"
                placeholder="08:00"
                value={value}
                error={get(errors, name)}
                onChange={(e, date) => {
                  methods.setValue(name, date)
                }}
              />
            )}
          />
        </div>

        <Controller
          render={({ field: { value, name } }) => (
            <div className="WorkoutDayAccordion__checkbox-container">
              <Checkbox
                checked={value}
                onChange={(e) => methods.setValue(name, e.target.checked)}
              />
              <Label className="WorkoutDayAccordion__checkbox">
                Save Workout as template
              </Label>
            </div>
          )}
          name={`activities.${index}.save_as_template`}
        />

        {/* <p className="WorkoutDayAccordion__subtitle">
          List workouts of this training plan
        </p> */}

        <WorkoutDayForm name={name} />
      </Styles>
    </DayAccordion>
  )
}
