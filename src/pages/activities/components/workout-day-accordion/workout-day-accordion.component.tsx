import { get } from 'lodash'
import { useMemo } from 'react'
import {
  Controller,
  // useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { useParams } from 'react-router'

// import { useParams } from 'react-router'
import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import AutoCompleteInput from '../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
// import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import TimePicker from '../../../../components/form/time-picker/time-picker.component'
import userTypes from '../../../../enums/user-types.enum'
// import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import useTemplateWorkouts from '../../../../hooks/api/templates/workouts/useTemplateWorkouts'
import { useAuth } from '../../../../hooks/auth.hook'
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
  const { clientId } = useParams<any>()
  const { type: userType } = useAuth()
  const methods = useFormContext()

  // const exercisesArray = useFieldArray({
  //   control: methods.control,
  //   name: `activities.${index}`
  // })

  // const days = useWatch({
  //   name: `days`,
  //   control: methods.control
  // })

  const [activities, workout] = useWatch({
    name: [`activities`, `activities.${index}`],
    control: methods.control
  })

  // const { revision } = useTrainingPlan({
  //   clientId,
  //   id: id,
  //   revisionId
  // })

  const { workouts } = useTemplateWorkouts({
    clientId: userTypes.TRAINER === userType ? 'all' : clientId
  })

  const { errors } = methods.formState

  const workoutName = useWatch({
    name: `activities.${index}.name`,
    control: methods.control
  })

  const name = `activities.${index}.items`

  // const onChange = (name: string, value: any) => {
  //   methods.setValue(name, value, { shouldValidate: true })
  // }

  const getWorkoutsOfPlan = () => {
    return activities?.filter((w: any) => !w.fromTemplate) || []
  }

  const onWorkoutNameSelected = (value: string) => {
    // find in templates
    let workout = workouts.find((w: any) => w._id === value)

    if (!workout) {
      // else not found, check in current DP
      const workoutsOfPlan = getWorkoutsOfPlan()
      workout = workoutsOfPlan.find((w: any) => w.name === value)
    } else {
      // found in template
      methods.setValue(`activities.${index}.fromTemplate`, true)
      methods.setValue(`activities.${index}._id`, workout._id)
    }

    if (workout) {
      // if you just try to set workout as a whole, exercise fields i.e. exerciseArray would not update.
      methods.setValue(`activities.${index}.name`, workout.name || '')
      methods.setValue(`activities.${index}.time`, workout.time || '')
      methods.setValue(`activities.${index}.items`, workout.items, {
        shouldValidate: true
      })
    }
  }

  const nameOptions = useMemo(() => {
    const workoutsOfPlan = getWorkoutsOfPlan()
    const planOptions = workoutsOfPlan
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
        value: w._id
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
  }, [activities.length, workoutName])

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
                {workout.fromTemplate
                  ? 'Update Training Plan template'
                  : 'Save Training Plan as template'}
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
