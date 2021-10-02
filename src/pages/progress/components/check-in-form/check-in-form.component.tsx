import { WeightIcon } from '../../../../assets/media/icons'
import ProgressEditCard from '../../../../components/cards/progress-edit-card/progress-eidt-card.component'
import Input from '../../../../components/form/input/input.component'

export default function CheckInForm() {
  return (
    <ProgressEditCard
      infoVariant="secondary"
      icon={<WeightIcon />}
      title="Lean Mass(kg)"
      inputComponent={
        <div className="log-measurements__fields">
          <Input
            id="log-current-weight-kg"
            label="Current Weight (kgs)"
            placeholder="80"
            className="log-measurements__field"
          />

          <Input
            id="log-current-weight-lbs"
            label="Current Weight (lbs)"
            placeholder="80"
          />
        </div>
      }
    />
  )
}
