import cloneDeep from 'lodash.clonedeep'
import { ReactNode, useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon, CheckIcon, EditIcon } from '../../../../assets/media/icons'
import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayCard from '../day-card/day-card.component'
import { ListItemStyles, Styles } from './day-training-split-edit-card.styles'

interface DayTrainingSplitCardProps {
  name: string
  tpWorkouts: any[]
  dpDays: any[]
  day?: string
  onWorkout: (id: string) => void
  onMealPlan: (id: string) => void
  onCardio: (id: string) => void
  edit?: boolean
  subtitle: string
}

const tempItemsOptions = [
  {
    label: 'Hello',
    value: {
      is_superset: false,
      data: {
        name: 'Hello',
        link: '',
        info: {
          sets: '10',
          reps: '10',
          tempo: '10',
          rest_interval: '10'
        }
      }
    }
  },
  {
    label: 'World',
    value: {
      is_superset: false,
      data: {
        name: 'World',
        link: '',
        info: {
          sets: '',
          reps: '',
          tempo: '',
          rest_interval: ''
        }
      }
    }
  }
]

export default function DayTrainingSplitEditCard(
  props: DayTrainingSplitCardProps
) {
  const {
    name,
    tpWorkouts,
    dpDays,
    day,
    edit,
    onWorkout,
    onMealPlan,
    onCardio,
    subtitle
  } = props

  const methods = useFormContext()
  const data = methods.watch(name)

  const items = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const onTPSelection = (name: string, value: string, isNew = false) => {
    if (isNew) {
      methods.setValue(
        name,
        [...data?.training_plan_activities, { name: value }],
        {
          shouldValidate: true
        }
      )
      return
    }
    methods.setValue(
      name,
      [
        ...data?.training_plan_activities,
        cloneDeep(tpWorkouts.find((w) => w._id === value))
      ],
      { shouldValidate: true }
    )
  }

  const onDPSelection = (name: string, value: string, isNew = false) => {
    if (isNew) {
      methods.setValue(
        name,
        { name: value },
        {
          shouldValidate: true
        }
      )
      return
    }
    methods.setValue(name, cloneDeep(dpDays.find((d) => d._id === value)), {
      shouldValidate: true
    })
  }

  return (
    <DayCard
      border="both"
      title={data.name || day}
      subtitle={subtitle === 'Invalid date' ? '' : subtitle}
      content={
        <Styles>
          <ListItem
            color={getColorCarry('orange_50')}
            title="Workouts"
            type="workout"
            content={
              data?.training_plan_activities?.map((a: any) => a.name) || []
            }
            name={`${name}.training_plan_activities`}
            selectOptions={
              tpWorkouts?.map((w) => ({ label: w.name, value: w._id })) || []
            }
            icon={<WorkoutIcon />}
            edit={edit}
            onSelection={onTPSelection}
            onClick={
              onWorkout
                ? () => onWorkout(`${name}.training_plan_activities` || '')
                : undefined
            }
          />
          <ListItem
            color={getColorCarry('primary_v2')}
            title="Meal Plan Day"
            type="mealPlan"
            content={
              data?.diet_plan_day?.name ? [data?.diet_plan_day?.name] : []
            }
            name={`${name}.diet_plan_day`}
            selectOptions={
              dpDays?.map((d) => ({ label: d.name, value: d._id })) || []
            }
            icon={<FoodIcon />}
            edit={edit}
            onSelection={onDPSelection}
            onClick={
              onMealPlan
                ? () => onMealPlan(`${name}.diet_plan_day` || '')
                : undefined
            }
          />
          <ListOther
            color={getColorCarry('red')}
            title="Other Exercises"
            content={items.fields}
            name={`${name}.items`}
            selectOptions={tempItemsOptions}
            icon={<ExerciseIcon />}
            onSelection={(name, value) => {
              items.append(value)
            }}
            onClick={onCardio ? () => onCardio('') : undefined}
          />
        </Styles>
      }
    />
  )
}

interface ListItemProps {
  color: string
  title: string
  type: 'mealPlan' | 'workout'
  icon: ReactNode
  content: string[]
  name: string
  selectOptions: { label: string; value: string }[]
  edit?: boolean
  onClick?: (id: string) => void
  onSelection: (name: string, value: string, isNew?: boolean) => void
}

function ListItem({
  color,
  title,
  type,
  content,
  name,
  selectOptions,
  icon,
  edit,
  onClick,
  onSelection
}: ListItemProps) {
  const [addNew, setAddNew] = useState(false)
  const [newName, setNewName] = useState('')

  const onChange = (value: string) => {
    if (value === 'add-new') {
      setAddNew(true)
      return
    }
    onSelection(name, value)
  }

  const onNewSave = () => {
    onSelection(name, newName, true)
    setAddNew(false)
    setNewName('')
  }

  return (
    <ListItemStyles className="DayTrainingSplitCard__li" $color={color}>
      <div className="DayTrainingSplitCard__li-icon">{icon}</div>

      <div className="DayTrainingSplitCard__li-content">
        <p className="DayTrainingSplitCard__li-title">{title}</p>

        {!!content.length &&
          content.map((c, i) => (
            <div key={c + i}>
              <p className="DayTrainingSplitCard__li-subtitle">
                <span>{c}</span>

                <IconButton
                  size="sm"
                  className="DayTrainingSplitCard__li-btn"
                  onClick={onClick}
                >
                  {edit ? <EditIcon /> : <AddIcon />}
                </IconButton>
              </p>
            </div>
          ))}
        {(type !== 'mealPlan' || !content[0]) && (
          <div className="DaySplitEditCard__control">
            <Controller
              name={name}
              render={({ field: { value } }) =>
                addNew ? (
                  <div className="DaySplitEditCard__control-newField">
                    <Input
                      className="DaySplitEditCard__control-input"
                      id="new-input"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <Button
                      className="DaySplitEditCard__control-checkBtn"
                      onClick={onNewSave}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                ) : (
                  <Select
                    id="DaySplitEditCard-training-plan"
                    placeholder="Search training plan"
                    value={value?.name || ''}
                    options={[
                      ...selectOptions,
                      { label: 'Create New', value: 'add-new' }
                    ]}
                    onChange={onChange}
                  />
                )
              }
            />
          </div>
        )}
      </div>
    </ListItemStyles>
  )
}
interface ListOtherProps {
  color: string
  title: string
  icon: ReactNode
  content: any[]
  name: string
  selectOptions: { label: string; value: any }[]
  onClick?: (id: string) => void
  onSelection: (name: string, value: any) => void
}

function ListOther({
  color,
  title,
  content,
  name,
  selectOptions,
  icon,
  onClick,
  onSelection
}: ListOtherProps) {
  return (
    <ListItemStyles className="DayTrainingSplitCard__li" $color={color}>
      <div className="DayTrainingSplitCard__li-icon">{icon}</div>

      <div className="DayTrainingSplitCard__li-content">
        <p className="DayTrainingSplitCard__li-title">{title}</p>

        {content.map((ctn, i) => (
          <div key={i}>
            <p className="DayTrainingSplitCard__li-subtitle">
              <span>{ctn?.data.name}</span>

              <IconButton
                size="sm"
                className="DayTrainingSplitCard__li-btn"
                onClick={onClick}
              >
                <AddIcon />
              </IconButton>
            </p>
          </div>
        ))}
        <div className="DaySplitEditCard__control">
          <Select
            id="DaySplitEditCard-training-plan"
            placeholder="Search training plan"
            options={selectOptions}
            onChange={(value) => {
              onSelection(name, value)
            }}
          />
        </div>
      </div>
    </ListItemStyles>
  )
}
