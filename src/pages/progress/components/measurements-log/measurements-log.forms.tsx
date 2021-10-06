import { createContext, useContext, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import {
  AbdominalIcon,
  Biceps2Icon,
  CalfIcon,
  CheekIcon,
  ChinIcon,
  HamstringIcon,
  KneeIcon,
  LibraryIcon,
  LowerBackIcon,
  MidaxillaryIcon,
  PecIcon,
  QuadIcon,
  SuprailiacIcon,
  TricepsIcon,
  Weight2Icon
} from '../../../../assets/media/icons'
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
  { key: 'chin', label: 'Chin', icon: ChinIcon },
  { key: 'cheek', label: 'Cheek', icon: CheekIcon },
  { key: 'pec', label: 'Pec', icon: PecIcon },
  { key: 'biceps', label: 'Biceps', icon: Biceps2Icon },
  { key: 'midaxillary', label: 'Midaxillary', icon: MidaxillaryIcon },
  { key: 'suprailiac', label: 'Suprailiac', icon: SuprailiacIcon },
  { key: 'abdominal', label: 'Abdominal', icon: AbdominalIcon },
  { key: 'triceps', label: 'Triceps', icon: TricepsIcon },
  { key: 'subscapular', label: 'Subscapular', icon: SuprailiacIcon },
  { key: 'lower_back', label: 'Lower Back', icon: LowerBackIcon },
  { key: 'knee', label: 'Knee', icon: KneeIcon },
  { key: 'calf', label: 'Calf', icon: CalfIcon },
  { key: 'quad', label: 'Quad', icon: QuadIcon },
  { key: 'hamstring', label: 'Hamstring', icon: HamstringIcon }
]

const CIRCUMFERENCE_FIELDS = [
  { key: 'neck', label: 'Neck', icon: ChinIcon },
  { key: 'chest', label: 'Chest', icon: AbdominalIcon },
  { key: 'shoulders', label: 'Shoulders', icon: AbdominalIcon },
  { key: 'upper_arm', label: 'Upper Arm', icon: Biceps2Icon },
  { key: 'waist', label: 'Waist', icon: Biceps2Icon },
  { key: 'hips', label: 'Hips', icon: Biceps2Icon },
  { key: 'upper_thighs', label: 'Upper Thighs', icon: Biceps2Icon }
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
  const { setValue, formState } = useFormContext()
  const { initMeasurement, prevMeasurement } = useContext(
    MeasurementsLogContext
  )

  const { errors } = formState

  return (
    <ProgressEditCard
      infoVariant="secondary"
      icon={<Weight2Icon />}
      title="Weight"
      init={
        initMeasurement?.weight_kgs ? (
          <>
            {initMeasurement.weight_kgs} kg <span>{initMeasurement.date}</span>
          </>
        ) : (
          '-'
        )
      }
      prev={
        prevMeasurement?.weight_kgs ? (
          <>
            {prevMeasurement?.weight_kgs} kg <span>{prevMeasurement.date}</span>
          </>
        ) : (
          '-'
        )
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
                error={errors.weight_kgs}
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
                error={errors.weight_lbs}
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
              icon={<field.icon />}
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
              icon={<field.icon />}
              title={field.label}
              init={initMeasurement?.measurements?.[field.key] || '-'}
              prev={prevMeasurement?.measurements?.[field.key] || '-'}
              InputProps={{
                id: `log-health-${field.key}`,
                label: 'Measurement (cm)',
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
        icon={<LibraryIcon />}
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
            <p className="log-total__label">
              Measurement ({skinfold ? 'mm' : 'cm'})
            </p>
            <p className="log-total__value">{totalValue}</p>
          </div>
        }
      />
      {skinfold && (
        <>
          <ProgressEditCard
            icon={<Biceps2Icon />}
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
            icon={<AbdominalIcon />}
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
            icon={<AbdominalIcon />}
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
