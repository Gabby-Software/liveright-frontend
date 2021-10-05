import { WeightIcon } from '../../../../assets/media/icons'
import ProgressEditCard from '../../../../components/cards/progress-edit-card/progress-eidt-card.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import LogDateCard from '../log-date-card/log-date-card.component'
import { Styles } from './goals-form.styles'

interface GoalsFormProps {
  className?: string
}

export default function GoalsForm({ className }: GoalsFormProps) {
  return (
    <Styles className={className}>
      <LogDateCard>
        <DatePicker id="log-goal-start" label="Goal Starts On" />
        <DatePicker id="log-goal-end" label="Goal Ends By" />
      </LogDateCard>

      <ProgressEditCard
        icon={<WeightIcon />}
        title="Lean Mass(kg)"
        InputProps={{
          id: 'log-health-mass',
          label: 'Target Mass',
          placeholder: '80'
        }}
      />

      <ProgressEditCard
        icon={<WeightIcon />}
        title="Body Weight(kg)"
        InputProps={{
          id: 'log-health-weight',
          label: 'Target Weight',
          placeholder: '80'
        }}
      />

      <ProgressEditCard
        icon={<WeightIcon />}
        title="Fit Percentage %"
        InputProps={{
          id: 'log-health-fat',
          label: 'Target Fat',
          placeholder: '80'
        }}
      />
    </Styles>
  )
}
