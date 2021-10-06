import { Controller, useFormContext } from 'react-hook-form'
import { useParams } from 'react-router'

import { WeightIcon } from '../../../../assets/media/icons'
import ProgressEditCard from '../../../../components/cards/progress-edit-card/progress-eidt-card.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import useGoals from '../../../../hooks/api/progress/useGoals'
import formatter from '../../../../managers/formatter.manager'
import LogDateCard from '../log-date-card/log-date-card.component'
import { Styles } from './goals-form.styles'

interface GoalsFormProps {
  className?: string
  names?: {
    from: string
    to: string
    lean_mass: string
    body_weight: string
    body_fat: string
  }
}

export default function GoalsForm({
  className,
  names = {
    from: 'from',
    to: 'to',
    lean_mass: 'lean_mass',
    body_weight: 'body_weight',
    body_fat: 'body_fat'
  }
}: GoalsFormProps) {
  const params = useParams<any>()
  const { setValue, formState } = useFormContext()
  const { errors } = formState

  const { goals } = useGoals({
    filter: {
      account_id: params.id
    }
  })

  const leanMass = goals.find((goal) => goal.type === 'lean_mass')
  const bodyWeight = goals.find((goal) => goal.type === 'body_weight')
  const bodyFat = goals.find((goal) => goal.type === 'body_fat')

  return (
    <Styles className={className}>
      <LogDateCard>
        <Controller
          render={({ field: { value, name } }) => (
            <DatePicker
              id="log-goal-start"
              label="Goal Starts On"
              value={value}
              onChange={(e, date) => setValue(name, date)}
              error={errors[names.from]?.message}
            />
          )}
          name={names.from}
        />
        <Controller
          render={({ field: { value, name } }) => (
            <DatePicker
              id="log-goal-end"
              label="Goal Ends By"
              value={value}
              onChange={(e, date) => setValue(name, date)}
              error={errors[names.to]?.message}
            />
          )}
          name={names.to}
        />
      </LogDateCard>

      <Controller
        render={({ field: { value, name } }) => (
          <ProgressEditCard
            icon={<WeightIcon />}
            title="Lean Mass(kg)"
            InputProps={{
              id: 'log-health-mass',
              label: 'Target Mass',
              placeholder: '80',
              value: value,
              onChange: (e) => setValue(name, Number(e.target.value)),
              format: formatter().number(),
              error: errors[names.lean_mass]?.message
            }}
            init={leanMass ? `${leanMass.goal} kg` : '-'}
            average={leanMass ? `${leanMass.goal} kg` : '-'}
          />
        )}
        name={names.lean_mass}
      />

      <Controller
        render={({ field: { value, name } }) => (
          <ProgressEditCard
            icon={<WeightIcon />}
            title="Body Weight(kg)"
            InputProps={{
              id: 'log-health-weight',
              label: 'Target Weight',
              placeholder: '80',
              value: value,
              onChange: (e) => setValue(name, Number(e.target.value)),
              format: formatter().number(),
              error: errors[names.body_weight]?.message
            }}
            init={bodyWeight ? `${bodyWeight.goal} kg` : '-'}
            average={bodyWeight ? `${bodyWeight.goal} kg` : '-'}
          />
        )}
        name={names.body_weight}
      />

      <Controller
        render={({ field: { value, name } }) => (
          <ProgressEditCard
            icon={<WeightIcon />}
            title="Fat Percentage %"
            InputProps={{
              id: 'log-health-fat',
              label: 'Target Fat',
              placeholder: '80',
              value: value,
              onChange: (e) => setValue(name, Number(e.target.value)),
              format: formatter().number(),
              error: errors[names.body_fat]?.message
            }}
            init={bodyFat ? `${bodyFat.goal}%` : '-'}
            average={bodyFat ? `${bodyFat.goal}%` : '-'}
          />
        )}
        name={names.body_fat}
      />
    </Styles>
  )
}
