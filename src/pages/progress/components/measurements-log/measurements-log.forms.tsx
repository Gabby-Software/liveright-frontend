import { Controller, useFormContext } from 'react-hook-form'

import { WeightIcon } from '../../../../assets/media/icons'
import { InputStyles } from '../../../../components/cards/progress-edit-card/progress-edit-card.styles'
import ProgressEditCard from '../../../../components/cards/progress-edit-card/progress-eidt-card.component'
import formatter from '../../../../managers/formatter.manager'
import { kgToLb, lbToKg } from '../../../../utils/body'
import { TotalStyles } from './measurements-log.styles'

const FIELDS = [
  { key: 'chin', label: 'Chin' },
  { key: 'cheek', label: 'Cheek' },
  { key: 'pec', label: 'Pec' },
  { key: 'biceps', label: 'Biceps' },
  { key: 'midaxillary', label: 'Midaxillary' },
  { key: 'suprailiac', label: 'Suprailiac ' },
  { key: 'abdominal', label: 'Abdominal ' },
  { key: 'triceps', label: 'Triceps ' },
  { key: 'subscapular', label: 'Subscapular' },
  { key: 'lower_back', label: 'Lower Back' },
  { key: 'knee', label: 'Knee' },
  { key: 'calf', label: 'Calf' },
  { key: 'quad', label: 'Quad' },
  { key: 'hamstring', label: 'Hamstring' }
]

const CIRCUMFERENCE_FIELDS = [
  { key: 'neck', label: 'Neck' },
  { key: 'chest', label: 'Chest' },
  { key: 'shoulders', label: 'Shoulders' },
  { key: 'upper_arm', label: 'Upper Arm' },
  { key: 'waist', label: 'Waist' },
  { key: 'hips', label: 'Hips' },
  { key: 'upper_thighs', label: 'Upper Thighs' },
  { key: 'calf', label: 'Calf' }
]

function WeightLogCard() {
  const { setValue } = useFormContext()
  return (
    <ProgressEditCard
      infoVariant="secondary"
      icon={<WeightIcon />}
      title="Lean Mass(kg)"
      inputComponent={
        <div className="log-measurements__fields">
          <Controller
            render={({ field: { value, name } }) => (
              <InputStyles
                id="log-current-weight-kg"
                label="Current Weight (kgs)"
                placeholder="80"
                className="log-measurements__field"
                value={value}
                format={formatter().number()}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  setValue(name, value)
                  setValue('weight_lbs', kgToLb(value))
                }}
              />
            )}
            name="weight_kgs"
          />

          <Controller
            render={({ field: { name, value } }) => (
              <InputStyles
                id="log-current-weight-lbs"
                label="Current Weight (lbs)"
                placeholder="80"
                className="log-measurements__field"
                value={value}
                format={formatter().number()}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  setValue(name, value)
                  setValue('weight_kgs', lbToKg(value))
                }}
              />
            )}
            name="weight_lbs"
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
  const { setValue } = useFormContext()
  return (
    <div>
      <WeightLogCard />

      {FIELDS.map((field) => (
        <Controller
          key={field.key}
          render={({ field: { name, value } }) => (
            <ProgressEditCard
              icon={<WeightIcon />}
              title={field.label}
              InputProps={{
                id: `log-health-${field.key}`,
                label: 'Measurement (mm)',
                placeholder: '80',
                format: formatter().number(),
                onChange: (e) => setValue(name, Number(e.target.value)),
                value: value
              }}
            />
          )}
          name={`measurements.${field.key}`}
        />
      ))}

      <TotalCard />
    </div>
  )
}

export function CircumferenceForm() {
  const { setValue } = useFormContext()
  return (
    <div>
      <WeightLogCard />

      {CIRCUMFERENCE_FIELDS.map((field) => (
        <Controller
          key={field.key}
          render={({ field: { name, value } }) => (
            <ProgressEditCard
              icon={<WeightIcon />}
              title={field.label}
              InputProps={{
                id: `log-health-${field.key}`,
                label: 'Measurement (mm)',
                placeholder: '80',
                format: formatter().number(),
                onChange: (e) => setValue(name, Number(e.target.value)),
                value: value
              }}
            />
          )}
          name={`measurements.${field.key}`}
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
