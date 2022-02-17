import cloneDeep from 'lodash.clonedeep'
import { ReactNode, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  AddIcon,
  CheckIcon,
  CrossIcon,
  EditIcon
} from '../../../../assets/media/icons'
import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import { CustomSelect } from '../../../../components/form/select/select.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { OptionType } from '../../../../types/option.type'
import DayCard from '../day-card/day-card.component'
import CardioEditDialog from '../edit-dialog/cardio/cardio-edit-dialog.component'
import { ListItemStyles, Styles } from './day-training-split-edit-card.styles'

interface DayTrainingSplitCardProps {
  name: string
  tpWorkouts: any[]
  dpDays: any[]
  day?: string
  cardios: any[]
  onWorkout: (id: string) => void
  onMealPlan: (id: string) => void
  onCardio: (id: string) => void
  onAddNewActivity?: (
    name: string,
    type: 'TP' | 'DP' | 'cardio',
    cardioItem?: any
  ) => void
  edit?: boolean
  subtitle: string
  newActivities?: {
    name: string
    type: 'TP' | 'DP' | 'cardio'
    cardioItem?: any
  }[]
}

export default function DayTrainingSplitEditCard(
  props: DayTrainingSplitCardProps
) {
  const {
    name,
    tpWorkouts,
    dpDays,
    day,
    cardios,
    newActivities,
    onWorkout,
    onMealPlan,
    onCardio,
    onAddNewActivity,
    subtitle
  } = props
  const methods = useFormContext()
  const data = methods.watch(name)

  const onChangeValue = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const onTPSelection = (name: string, value: string, isNew = false) => {
    if (isNew) {
      const newWorkout = tpWorkouts.find((w) => w.name === value) || {
        name: value
      }
      onAddNewActivity?.(newWorkout.name, 'TP')
      onChangeValue(name, [...data?.training_plan_activities, newWorkout])
      return
    }

    onChangeValue(name, [
      ...data?.training_plan_activities,
      tpWorkouts.find((w) => w._id === value)
        ? cloneDeep(tpWorkouts.find((w) => w._id === value))
        : { name: value }
    ])
  }

  const onCardioSelection = (name: string, value: string, Canceled = false) => {
    if (newActivities?.find((a) => a.name === value && a.cardioItem)) {
      onChangeValue(name, [
        ...data?.items,
        {
          data: newActivities?.find((a) => a.name === value && a.cardioItem)
            ?.cardioItem
        }
      ])
      return
    }
    if (Canceled) {
      onCardioRemove(name, data?.items.length - 1 || 0)
      return
    }
    onChangeValue(name, [
      ...data?.items,
      cloneDeep(cardios.find((w) => w._id === value))
    ])
  }

  const onDPSelection = (name: string, value: string, isNew = false) => {
    if (isNew) {
      const newMeal = dpDays.find((m) => m.name === value) || {
        name: value
      }
      onAddNewActivity?.(newMeal.name, 'DP')
      onChangeValue(name, newMeal)
      return
    }
    onChangeValue(
      name,
      dpDays.find((d) => d._id === value)
        ? cloneDeep(dpDays.find((d) => d._id === value))
        : { name: value }
    )
  }

  const onTPRevome = (name: string, index: number) => {
    const workouts = [...data.training_plan_activities]
    workouts.splice(index, 1)
    onChangeValue(name, [...workouts])
  }

  const onDPRevome = (name: string) => {
    /**
     * TODO
     * The meal plan was not removing correctly on very first delete
     * when editing. It was changing the value correctly but was not
     * re-rendering. For some reason the `data` object above was refering
     * to same object in memory after removal, thus no re-render. This is
     * just a hack/workouk around for this because of time constraints,so
     * if anyone finds a real solution to this, please fix it.
     */
    const newData = cloneDeep(data)
    onChangeValue(name.substring(0, name.lastIndexOf('.')), {
      ...newData,
      diet_plan_day: null
    })
  }

  const onCardioRemove = (name: string, index: number) => {
    const m_cardios = [...data.items]
    m_cardios.splice(index, 1)
    onChangeValue(name, [...m_cardios])
  }

  const workoutsOptions = useMemo(() => {
    const optionsFromTP = tpWorkouts
      .filter((w) => !w.fromTemplate)
      .map((w: any) => ({ label: w.name, value: w._id }))
    const optionsFromTemp = tpWorkouts
      .filter((w) => w.fromTemplate)
      .map((w: any) => ({ label: w.name, value: w._id }))
    const newOptions =
      newActivities
        ?.filter((a) => a.type === 'TP')
        .map((a) => ({
          label: a.name,
          value: a.name
        })) || []

    const options = []

    if (newOptions.length) {
      options.push({
        label: 'New',
        options: newOptions
      })
    }

    if (optionsFromTP.length) {
      options.push({
        label: 'From Training Plan',
        options: optionsFromTP
      })
    }

    if (optionsFromTemp.length) {
      options.push({
        label: 'From Templates',
        options: optionsFromTemp
      })
    }

    return options
  }, [tpWorkouts, newActivities])

  const mealOptions = useMemo(() => {
    const optionsFromDP = dpDays
      .filter((w) => !w.fromTemplate)
      .map((w: any) => ({ label: w.name, value: w._id }))
    const optionsFromTemp = dpDays
      .filter((w) => w.fromTemplate)
      .map((w: any) => ({ label: w.name, value: w._id }))
    const newOptions =
      newActivities
        ?.filter((a) => a.type === 'DP')
        .map((a) => ({
          label: a.name,
          value: a.name
        })) || []

    const options = []

    if (newOptions.length) {
      options.push({
        label: 'New',
        options: newOptions
      })
    }

    if (optionsFromDP.length) {
      options.push({
        label: 'From Diet Plan',
        options: optionsFromDP
      })
    }

    if (optionsFromTemp.length) {
      options.push({
        label: 'From Templates',
        options: optionsFromTemp
      })
    }

    return options
  }, [dpDays, newActivities])

  const cardiosOptions = useMemo(() => {
    const optionsFromTemp = cardios.map((w: any) => ({
      label: w.name,
      value: w._id
    }))
    const newOptions =
      newActivities
        ?.filter((a) => a.type === 'cardio')
        .map((a) => ({
          label: a.name,
          value: a.name
        })) || []

    const options = []

    if (newOptions.length) {
      options.push({
        label: 'New',
        options: newOptions
      })
    }

    if (optionsFromTemp.length) {
      options.push({
        label: 'From Templates',
        options: optionsFromTemp
      })
    }

    return options
  }, [cardios, newActivities])

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
            selectOptions={workoutsOptions}
            icon={<WorkoutIcon />}
            onSelection={onTPSelection}
            onEdit={() => onWorkout(`${name}.training_plan_activities` || '')}
            onRemove={onTPRevome}
          />
          <ListItem
            color={getColorCarry('primary_v2')}
            icon={<FoodIcon />}
            title="Meal Plan Day"
            type="mealPlan"
            content={[data?.diet_plan_day?.name].filter((d) => !!d)}
            name={`${name}.diet_plan_day`}
            selectOptions={mealOptions}
            onSelection={onDPSelection}
            onEdit={() => onMealPlan(`${name}.diet_plan_day` || '')}
            onRemove={onDPRevome}
          />
          <ListOther
            color={getColorCarry('red')}
            title="Other Exercises"
            type="cardio"
            content={data?.items || []}
            name={`${name}.items`}
            selectOptions={cardiosOptions}
            icon={<ExerciseIcon />}
            onSelection={onCardioSelection}
            onEdit={(idx) => onCardio(`${name}.items[${idx}].data` || '')}
            onRemove={onCardioRemove}
            onAddCardio={(data) => {
              console.log('add', data)
              onAddNewActivity?.(data.name, 'cardio', data)
            }}
          />
        </Styles>
      }
    />
  )
}

interface ListItemProps {
  color: string
  title: string
  type: 'mealPlan' | 'workout' | 'cardio'
  icon: ReactNode
  content: any[]
  name: string
  selectOptions: OptionType[] | { label: string; options: OptionType[] }[]
  onEdit: (idx: number) => void
  onRemove: (name: string, idx: number) => void
  onSelection: (name: string, value: string, isNew?: boolean) => void
  onAddCardio?: (data: any) => void
}

function ListItem({
  color,
  title,
  type,
  content,
  name,
  selectOptions,
  icon,
  onRemove,
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

  const createNewLabel = (
    <div className="createNew-option">
      <AddIcon /> Create New
    </div>
  )

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

                <div className="DayTrainingSplitCard__li-btns">
                  {/* <IconButton
                    size="sm"
                    className="DayTrainingSplitCard__li-btn"
                    onClick={onEdit}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <IconButton
                    size="sm"
                    className="DayTrainingSplitCard__li-btn"
                    onClick={() => onRemove(name, i)}
                  >
                    <CrossIcon />
                  </IconButton>
                </div>
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
                  <CustomSelect
                    id="DaySplitEditCard-training-plan"
                    placeholder="Search training plan"
                    value={value?.name || ''}
                    options={[
                      ...selectOptions,
                      { label: createNewLabel, value: 'add-new' }
                    ]}
                    forceDesktop
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

function ListOther({
  color,
  title,
  type,
  content,
  name,
  selectOptions,
  icon,
  onEdit,
  onRemove,
  onSelection,
  onAddCardio
}: ListItemProps) {
  const [editCardio, setEditCardio] = useState('')

  const methods = useFormContext()

  const onChange = (value: string) => {
    if (value === 'add-new') {
      setEditCardio(`${name}.[${content?.length || 0}].data`)
      return
    }
    onSelection(name, value)
  }

  const createNewLabel = (
    <div className="createNew-option">
      <AddIcon /> Create New
    </div>
  )

  return (
    <ListItemStyles className="DayTrainingSplitCard__li" $color={color}>
      <div className="DayTrainingSplitCard__li-icon">{icon}</div>
      {editCardio && (
        <CardioEditDialog
          open={!!editCardio}
          onClose={(result) => {
            if (result) {
              onSelection(name, '', true)
            } else {
              onAddCardio?.(methods.getValues(editCardio))
            }
            setEditCardio('')
          }}
          name={editCardio}
        />
      )}
      <div className="DayTrainingSplitCard__li-content">
        <p className="DayTrainingSplitCard__li-title">{title}</p>

        {!!content.length &&
          content.map((c, i) => (
            <div key={i}>
              <p className="DayTrainingSplitCard__li-subtitle">
                <span>{c?.data?.name}</span>

                <div className="DayTrainingSplitCard__li-btns">
                  <IconButton
                    size="sm"
                    className="DayTrainingSplitCard__li-btn"
                    onClick={() => onEdit?.(i)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    className="DayTrainingSplitCard__li-btn"
                    onClick={() => onRemove(name, i)}
                  >
                    <CrossIcon />
                  </IconButton>
                </div>
              </p>
            </div>
          ))}
        {(type !== 'mealPlan' || !content[0]) && (
          <div className="DaySplitEditCard__control">
            <Controller
              name={name}
              render={({ field: { value } }) => (
                <CustomSelect
                  id="DaySplitEditCard-training-plan"
                  placeholder="Search cardio exercise"
                  value={value}
                  options={[
                    ...selectOptions,
                    { label: createNewLabel, value: 'add-new' }
                  ]}
                  forceDesktop
                  onChange={onChange}
                />
              )}
            />
          </div>
        )}
      </div>
    </ListItemStyles>
  )
}
