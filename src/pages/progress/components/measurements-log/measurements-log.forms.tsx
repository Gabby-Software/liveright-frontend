import { createContext, useContext, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { WeightIcon } from '../../../../assets/media/icons'
import { InputStyles } from '../../../../components/cards/progress-edit-card/progress-edit-card.styles'
import ProgressEditCard from '../../../../components/cards/progress-edit-card/progress-eidt-card.component'
import formatter from '../../../../managers/formatter.manager'
import {
  getBodyFat,
  getFatMass,
  getLeanMass,
  getTotal
} from '../../../../utils/api/progress'
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
  { key: 'upper_thighs', label: 'Upper Thighs' }
]

interface MeasurementsLogContextProps {
  initMeasurement: any
  prevMeasurement: any
}

export const MeasurementsLogContext =
  createContext<MeasurementsLogContextProps>({
    initMeasurement: {},
    prevMeasurement: {}
  })

function WeightLogCard() {
  const { setValue } = useFormContext()
  const { initMeasurement, prevMeasurement } = useContext(
    MeasurementsLogContext
  )
  return (
    <ProgressEditCard
      infoVariant="secondary"
      icon={<WeightIcon />}
      title="Weight"
      init={
        initMeasurement?.weight_kgs ? `${initMeasurement?.weight_kgs} kg` : '-'
      }
      prev={
        prevMeasurement?.weight_kgs ? `${prevMeasurement?.weight_kgs} kg` : '-'
      }
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
  const { initMeasurement, prevMeasurement } = useContext(
    MeasurementsLogContext
  )
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
              init={initMeasurement?.measurements?.[field.key] || '-'}
              prev={prevMeasurement?.measurements?.[field.key] || '-'}
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
  const { initMeasurement, prevMeasurement } = useContext(
    MeasurementsLogContext
  )
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
              init={initMeasurement?.measurements?.[field.key] || '-'}
              prev={prevMeasurement?.measurements?.[field.key] || '-'}
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

function TotalCard() {
  const { control, setValue } = useFormContext()
  const values = useWatch({ control })

  const { initMeasurement, prevMeasurement } = useContext(
    MeasurementsLogContext
  )

  const bodyFatValue = getBodyFat(values)
  const fatMassValue = getFatMass(values)
  const leanMassValue = getLeanMass(values)
  const totalValue = getTotal(values, values.type)

  useEffect(() => {
    setValue('body_fat', bodyFatValue)
    setValue('fat_mass', fatMassValue)
    setValue('lean_mass', leanMassValue)
  }, [bodyFatValue, fatMassValue, leanMassValue])

  const skinfold = values.type === 'skin_fold'

  return (
    <TotalStyles>
      <ProgressEditCard
        icon={<WeightIcon />}
        title="Total"
        className="log-total__row"
        init={
          initMeasurement ? `${getTotal(initMeasurement, values.type)}` : '-'
        }
        prev={
          prevMeasurement ? `${getTotal(prevMeasurement, values.type)}` : '-'
        }
        inputComponent={
          <div>
            <p className="log-total__label">Measurement (mm)</p>
            <p className="log-total__value">{totalValue}</p>
          </div>
        }
      />
      {skinfold && (
        <>
          <ProgressEditCard
            icon={<WeightIcon />}
            title="Body Fat %"
            className="log-total__row"
            init={
              initMeasurement?.body_fat ? `${initMeasurement?.body_fat}%` : '-'
            }
            prev={
              prevMeasurement?.body_fat ? `${prevMeasurement?.body_fat}%` : '-'
            }
            inputComponent={
              <div>
                <p className="log-total__label">Measurement (%)</p>
                <p className="log-total__value">{bodyFatValue}</p>
              </div>
            }
          />
          <ProgressEditCard
            icon={<WeightIcon />}
            title="Fat Mass(kg)"
            className="log-total__row"
            init={
              initMeasurement?.fat_mass
                ? `${initMeasurement?.fat_mass} kg`
                : '-'
            }
            prev={
              prevMeasurement?.fat_mass
                ? `${prevMeasurement?.fat_mass} kg`
                : '-'
            }
            inputComponent={
              <div>
                <p className="log-total__label">Measurement (kg)</p>
                <p className="log-total__value">{fatMassValue}</p>
              </div>
            }
          />
          <ProgressEditCard
            icon={<WeightIcon />}
            title="Lean Mass(kg)"
            className="log-total__row"
            init={
              initMeasurement?.lean_mass
                ? `${initMeasurement?.lean_mass} kg`
                : '-'
            }
            prev={
              prevMeasurement?.lean_mass
                ? `${prevMeasurement?.lean_mass} kg`
                : '-'
            }
            inputComponent={
              <div>
                <p className="log-total__label">Measurement (kg)</p>
                <p className="log-total__value">{leanMassValue}</p>
              </div>
            }
          />
        </>
      )}
    </TotalStyles>
  )
}
