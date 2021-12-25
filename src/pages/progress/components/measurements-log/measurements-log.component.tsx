import { yupResolver } from '@hookform/resolvers/yup'
import deepmerge from 'deepmerge'
import { useEffect, useRef, useState } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

import Button from '../../../../components/buttons/button/button.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Textarea from '../../../../components/form/textarea/textarea.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import Tabs from '../../../../components/tabs/tabs.component'
import { Subtitle } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useMeasurement from '../../../../hooks/api/progress/useMeasurement'
import useMeasurements from '../../../../hooks/api/progress/useMeasurements'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { isClient } from '../../../../utils/api/auth'
import { dataToFormValues } from '../../../../utils/api/progress'
import { getRoute } from '../../../../utils/routes'
import LogClient from '../../../progress-log/log-health-data/components/log-client/log-client.component'
import ClientInfoMobile from '../client-info-mobile/client-info-mobile.component'
import GoalsForm from '../goals-form/goals-form.component'
import LogDateCard from '../log-date-card/log-date-card.component'
import LogForm from '../log-form/log-form.component'
import PhotoForm from '../photo-form/photo-form.component'
import {
  CheckInForm,
  CircumferenceForm,
  ConfirmDialog,
  MeasurementsLogContext,
  SkinfoldForm
} from './measurements-log.forms'
import { Styles } from './measurements-log.styles'

const validationSchema = yup.object().shape({
  date: yup.string().required(),
  weight_kgs: yup.number().max(400).required().nullable(),
  weight_lbs: yup.number().max(882).required().nullable()
})

export const defaultValues = {
  type: 'check_in',
  date: '',
  notes: '',
  images: {
    front: null,
    back: null,
    side: null
  },
  weight_kgs: null,
  weight_lbs: null,
  lean_mass: null,
  body_fat: null,
  fat_mass: null,
  measurements: {
    chin: null,
    cheek: null,
    pec: null,
    biceps: null,
    midaxillary: null,
    suprailiac: null,
    abdominal: null,
    triceps: null,
    subscapular: null,
    lower_back: null,
    knee: null,
    calf: null,
    quad: null,
    hamstring: null,
    neck: null,
    chest: null,
    shoulders: null,
    upper_arm: null,
    waist: null,
    hips: null,
    upper_thighs: null
  },
  goals: {
    from: '',
    to: '',
    lean_mass: null,
    body_fat: null,
    body_weight: null
  }
}

const formConfig: any = {
  defaultValues,
  resolver: yupResolver(validationSchema)
}

export default function MeasurementsLog() {
  const { type } = useAuth()
  const history = useHistory()
  const params = useParams<any>()
  const isMobile = useIsMobile()
  const [isPhoto, setPhoto] = useState(false)
  const [isGoals, setGoals] = useState(false)
  const [redirectTo, setRedirectTo] = useState('')

  const updateValuesRef = useRef<any>()
  const onUnlockRef = useRef<any>()

  const initMeasurements = useMeasurements({
    per_page: 1,
    filter: {
      account_id: params.clientId
    },
    sort: {
      date: 'asc'
    }
  })

  const prevMeasurements = useMeasurements({
    per_page: 1,
    filter: {
      account_id: params.clientId
    },
    sort: {
      date: 'desc'
    }
  })

  const { onAdd } = useMeasurements({
    skip: true,
    filter: {
      date: params.date,
      account_id: params.clientId
    },
    per_page: 1
  })

  const { measurement } = useMeasurement({ id: params.logId })

  const methods = useForm(formConfig)

  const { errors } = methods.formState

  const values: any = useWatch({
    control: methods.control,
    name: ['type', 'images']
  })

  const logType: string = values[0]
  const images: any = values[1]

  const dataKey = JSON.stringify(measurement)

  useEffect(() => {
    if (measurement.id) {
      const formValues: any = deepmerge(
        defaultValues,
        dataToFormValues(measurement)
      )
      updateValuesRef.current?.(formValues)

      Object.keys(formValues).forEach((key) =>
        methods.setValue(key as any, formValues[key])
      )

      if (
        Object.keys(formValues.images)?.filter(
          (key) => !!formValues.images?.[key]
        )?.length
      ) {
        setPhoto(true)
      } else {
        setPhoto(false)
      }
    } else {
      const values = defaultValues
      setPhoto(false)
      updateValuesRef.current?.(values)
      methods.reset(values)
    }
  }, [dataKey, measurement.id])

  const backTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_MEASUREMENTS
    : getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.clientId })

  const onSave = (values: any) => {
    onAdd(values, measurement.id, () => {
      history.push(redirectTo || backTo)
    })
  }

  const handleSave = () => {
    onUnlockRef.current?.()
    methods.handleSubmit(onSave)()
  }

  const contextValue = {
    initMeasurement: initMeasurements.measurements[0],
    prevMeasurement: prevMeasurements.measurements[0]
  }

  const content = (
    <Styles $client={isClient(type)}>
      {!isMobile && (
        <>
          <MobileBack to={backTo} alias="measurements" />
          <Subtitle size="sm" className="log-measurements__title">
            Log Measurements
          </Subtitle>
        </>
      )}

      {!isClient(type) ? isMobile ? <ClientInfoMobile /> : <LogClient /> : null}

      <LogForm>
        <div>
          <LogDateCard>
            <Controller
              render={({ field: { name, value } }) => (
                <DatePicker
                  id="log-measurements-date"
                  label="Logging Date"
                  value={value}
                  disabledFuture
                  error={errors.date?.message}
                  onChange={(e, date) => {
                    methods.setValue(name, date)
                    // history.push(
                    //   isClient(type)
                    //     ? getRoute(Routes.PROGRESS_CLIENT_LOG_MEASUREMENTS, {
                    //         date
                    //       })
                    //     : getRoute(Routes.PROGRESS_LOG_MEASUREMENTS, {
                    //         id: params.clientId,
                    //         date
                    //       })
                    // )
                  }}
                />
              )}
              name="date"
            />
          </LogDateCard>

          <div className="log-measurements__forms">
            <Tabs
              activeKey={logType}
              onChange={(key) => methods.setValue('type', key)}
              tabs={[
                {
                  label: 'Check-In',
                  key: 'check_in',
                  renderContent: CheckInForm
                },
                {
                  label: 'Skinfold',
                  key: 'skin_fold',
                  renderContent: SkinfoldForm
                },
                {
                  label: 'Circumference',
                  key: 'circumference',
                  renderContent: CircumferenceForm
                }
              ]}
            />
          </div>

          <div className="log-measurements__toggle-container">
            <div className="log-measurements__toggle-row">
              <FormToggleUI
                value={isPhoto}
                onUpdate={() => setPhoto(!isPhoto)}
              />
              <span className="log-measurements__toggle-label">Add Photos</span>
            </div>

            {isPhoto && (
              <PhotoForm
                front={images?.front}
                side={images?.side}
                back={images?.back}
                onChange={(name: any, file) => methods.setValue(name, file)}
              />
            )}
          </div>

          <div className="log-measurements__toggle-container">
            <div className="log-measurements__toggle-row">
              <FormToggleUI
                value={isGoals}
                onUpdate={() => setGoals(!isGoals)}
              />
              <span className="log-measurements__toggle-label">
                Change Related Goals
              </span>
            </div>

            {isGoals && (
              <GoalsForm
                className="log-measurements__goals-form"
                names={{
                  from: 'goals.from',
                  to: 'goals.to',
                  lean_mass: 'goals.lean_mass',
                  body_fat: 'goals.body_fat',
                  body_weight: 'goals.body_weight'
                }}
              />
            )}
          </div>

          <div>
            <Controller
              render={({ field: { name, value } }) => (
                <Textarea
                  id="log-measurement-notes"
                  label="Comments/Notes"
                  placeholder="Add note..."
                  value={value}
                  onChange={(e) => methods.setValue(name, e.target.value)}
                />
              )}
              name="notes"
            />
          </div>
        </div>

        <div className="log-measurements__submitContainer">
          <Button className="log-measurements__submit" onClick={handleSave}>
            Save Measurements
          </Button>
        </div>
      </LogForm>
    </Styles>
  )

  return (
    <MeasurementsLogContext.Provider value={contextValue}>
      <FormProvider {...methods}>
        <>
          {isMobile ? (
            <MobilePage
              title="Log Measurements"
              headerSpacing={isClient(type) ? undefined : 20}
              actionComponent={<Button onClick={handleSave}>Save</Button>}
              headerTopComponent={
                <HeaderLink to={backTo}>Back to Measurements</HeaderLink>
              }
            >
              {content}
            </MobilePage>
          ) : (
            content
          )}

          <ConfirmDialog
            updateValuesRef={updateValuesRef}
            onUnlockRef={onUnlockRef}
            redirectTo={redirectTo}
            onRedirectTo={setRedirectTo}
            onSave={handleSave}
          />
        </>
      </FormProvider>
    </MeasurementsLogContext.Provider>
  )
}
