import { WeightIcon } from '../../../../assets/media/icons'
import ProgressEditCard from '../../../../components/cards/progress-edit-card/progress-eidt-card.component'
import Input from '../../../../components/form/input/input.component'
import { TotalStyles } from './measurements-log.styles'

const FIELDS = [
  { key: 'chin', label: 'Chin' },
  { key: 'cheek', label: 'Cheek' },
  { key: 'pec', label: 'Pec' },
  { key: 'biceps', label: 'Biceps' },
  { key: 'midaxillary', label: 'Midaxillary' },
  { key: 'suprailiac ', label: 'Suprailiac ' },
  { key: 'abdominal ', label: 'Abdominal ' },
  { key: 'triceps ', label: 'Triceps ' },
  { key: 'subscapular', label: 'Subscapular' },
  { key: 'lowerBack', label: 'Lower Back' },
  { key: 'knee', label: 'Knee' },
  { key: 'calf', label: 'Calf' },
  { key: 'quad', label: 'Quad' },
  { key: 'hamstring', label: 'Hamstring' }
]

const CIRCUMFERENCE_FIELDS = [
  { key: 'neck', label: 'Neck' },
  { key: 'chest', label: 'Chest' },
  { key: 'shoulders', label: 'Shoulders' },
  { key: 'upperArm', label: 'Upper Arm' },
  { key: 'waist', label: 'Waist' },
  { key: 'hips', label: 'Hips' },
  { key: 'upperThighs', label: 'Upper Thighs' },
  { key: 'calf', label: 'Calf' }
]

function WeightLogCard() {
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

export function CheckInForm() {
  return (
    <div>
      <WeightLogCard />
    </div>
  )
}

export function SkinfoldForm() {
  return (
    <div>
      <WeightLogCard />

      {FIELDS.map((field) => (
        <ProgressEditCard
          key={field.key}
          icon={<WeightIcon />}
          title={field.label}
          InputProps={{
            id: `log-health-${field.key}`,
            label: 'Measurement (mm)',
            placeholder: '80'
          }}
        />
      ))}

      <TotalCard />
    </div>
  )
}

export function CircumferenceForm() {
  return (
    <div>
      <WeightLogCard />

      {CIRCUMFERENCE_FIELDS.map((field) => (
        <ProgressEditCard
          key={field.key}
          icon={<WeightIcon />}
          title={field.label}
          InputProps={{
            id: `log-health-${field.key}`,
            label: 'Measurement (cm)',
            placeholder: '80'
          }}
        />
      ))}

      <TotalCard bodyFat={false} fatMass={false} leanMass={false} />
    </div>
  )
}

interface TotalCardProps {
  bodyFat?: boolean
  fatMass?: boolean
  leanMass?: boolean
}

function TotalCard({
  bodyFat = true,
  fatMass = true,
  leanMass = true
}: TotalCardProps) {
  return (
    <TotalStyles>
      <ProgressEditCard
        icon={<WeightIcon />}
        title="Total"
        className="log-total__row"
        inputComponent={
          <div>
            <p className="log-total__label">Measurement (mm)</p>
            <p className="log-total__value">45</p>
          </div>
        }
      />
      {bodyFat && (
        <ProgressEditCard
          icon={<WeightIcon />}
          title="Body Fat %"
          className="log-total__row"
          inputComponent={
            <div>
              <p className="log-total__label">Measurement (mm)</p>
              <p className="log-total__value">45</p>
            </div>
          }
        />
      )}
      {fatMass && (
        <ProgressEditCard
          icon={<WeightIcon />}
          title="Fat Mass(kg)"
          className="log-total__row"
          inputComponent={
            <div>
              <p className="log-total__label">Measurement (mm)</p>
              <p className="log-total__value">45</p>
            </div>
          }
        />
      )}
      {leanMass && (
        <ProgressEditCard
          icon={<WeightIcon />}
          title="Lean Mass(kg)"
          className="log-total__row"
          inputComponent={
            <div>
              <p className="log-total__label">Measurement (mm)</p>
              <p className="log-total__value">45</p>
            </div>
          }
        />
      )}
    </TotalStyles>
  )
}
