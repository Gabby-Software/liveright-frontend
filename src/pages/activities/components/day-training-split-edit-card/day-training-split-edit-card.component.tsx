import cloneDeep from 'lodash.clonedeep'
import { ReactNode } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon, EditIcon } from '../../../../assets/media/icons'
import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Select from '../../../../components/form/select/select.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayCard, { DayCardProps } from '../day-card/day-card.component'
import { ListItemStyles, Styles } from './day-training-split-edit-card.styles'

interface DayTrainingSplitCardProps {
  name: string
  tpDays: any[]
  dpDays: any[]
  day?: string
  onWorkout: (id: string) => void
  onMealPlan: (id: string) => void
  onCardio: (id: string) => void
  edit?: boolean
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
          sets: '',
          reps: '',
          tempo: '',
          rest_interval: ''
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
  props: Pick<DayCardProps, 'onExpand'> & DayTrainingSplitCardProps
) {
  const { name, tpDays, dpDays, day, edit, onWorkout, onMealPlan, onCardio } =
    props

  const methods = useFormContext()
  const data = methods.watch(name)

  const items = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  return (
    <DayCard
      border="both"
      title={data.name || day}
      subtitle="Wednesday"
      onExpand={props.onExpand}
      content={
        <Styles>
          <ListItem
            color={getColorCarry('orange_50')}
            title="Workout Day"
            content={data?.training_plan_day?.name || ''}
            name={`${name}.training_plan_day`}
            selectOptions={
              tpDays?.map((d) => ({ label: d.name, value: d })) || []
            }
            icon={<WorkoutIcon />}
            edit={edit}
            onSelection={(name, value) =>
              methods.setValue(name, value, { shouldValidate: true })
            }
            onClick={
              onWorkout
                ? () => onWorkout(`${name}.training_plan_day` || '')
                : undefined
            }
          />
          <ListItem
            color={getColorCarry('primary_v2')}
            title="Meal Plan Day"
            content={data?.diet_plan_day?.name || ''}
            name={`${name}.diet_plan_day`}
            selectOptions={
              dpDays?.map((d) => ({ label: d.name, value: d })) || []
            }
            icon={<FoodIcon />}
            edit={edit}
            onSelection={(name, value) =>
              methods.setValue(name, value, { shouldValidate: true })
            }
            onClick={
              onMealPlan
                ? () => onMealPlan(`${name}.diet_plan_day` || '')
                : undefined
            }
          />
          <ListOther
            color={getColorCarry('blue_50')}
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
  icon: ReactNode
  content: string
  name: string
  selectOptions: { label: string; value: string }[]
  edit?: boolean
  onClick?: (id: string) => void
  onSelection: (name: string, value: string) => void
}

function ListItem({
  color,
  title,
  content,
  name,
  selectOptions,
  icon,
  edit,
  onClick,
  onSelection
}: ListItemProps) {
  return (
    <ListItemStyles className="DayTrainingSplitCard__li" $color={color}>
      <div className="DayTrainingSplitCard__li-icon">{icon}</div>

      <div className="DayTrainingSplitCard__li-content">
        <p className="DayTrainingSplitCard__li-title">{title}</p>

        {content ? (
          <div>
            <p className="DayTrainingSplitCard__li-subtitle">
              <span>{content}</span>

              <IconButton
                size="sm"
                className="DayTrainingSplitCard__li-btn"
                onClick={onClick}
              >
                {edit ? <EditIcon /> : <AddIcon />}
              </IconButton>
            </p>
          </div>
        ) : (
          <div className="DaySplitEditCard__control">
            <Controller
              name={name}
              render={({ field: { value, name } }) => (
                <Select
                  id="DaySplitEditCard-training-plan"
                  placeholder="Search training plan"
                  value={value?.name || ''}
                  options={selectOptions}
                  onChange={(value) => onSelection?.(name, cloneDeep(value))}
                />
              )}
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
