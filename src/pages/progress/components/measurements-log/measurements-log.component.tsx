import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
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
  MeasurementsLogContext,
  SkinfoldForm
} from './measurements-log.forms'
import { Styles } from './measurements-log.styles'

const validationSchema = yup.object().shape({
  date: yup.string().required(),
  weight_kgs: yup.number().max(400).required().nullable(),
  weight_lbs: yup.number().max(882).required().nullable()
})

const defaultValues = {
  type: 'check_in',
  date: '',
  notes: '',
  images: {},
  weight_kgs: null,
  weight_lbs: null,
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

  const initMeasurements = useMeasurements({
    per_page: 1,
    filter: {
      account_id: params.id
    },
    sort: {
      date: 'asc'
    }
  })

  const prevMeasurements = useMeasurements({
    per_page: 1,
    filter: {
      account_id: params.id
    },
    sort: {
      date: 'desc'
    }
  })

  const { onAdd, onFilters, measurements } = useMeasurements({
    skip: !params.date,
    filter: {
      date: params.date,
      account_id: params.id
    },
    per_page: 1
  })

  const data = measurements[0] || {}

  const methods = useForm(formConfig)

  const { errors } = methods.formState

  const values = useWatch({
    control: methods.control,
    name: ['type', 'images']
  })
  const logType: string = values[0]
  const images: any = values[1]

  const dataKey = JSON.stringify(data)

  useEffect(() => {
    if (data.id) {
      const formValues = dataToFormValues(data)

      Object.keys(formValues).forEach((key) =>
        methods.setValue(key as any, formValues[key])
      )

      if (Object.keys(formValues.images)?.length) {
        setPhoto(true)
      }
    } else {
      methods.reset({
        ...defaultValues,
        date: params.date
      })
    }
  }, [dataKey])

  const backTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_MEASUREMENTS
    : getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.id })

  const handleSave = (values: any) => {
    onAdd(values, data.id)
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
                    onFilters('date', date)
                    history.replace(
                      isClient(type)
                        ? getRoute(Routes.PROGRESS_CLIENT_LOG_MEASUREMENTS, {
                            date
                          })
                        : getRoute(Routes.PROGRESS_LOG_MEASUREMENTS, {
                            id: params.id,
                            date
                          })
                    )
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

        <div>
          <Button
            className="log-measurements__submit"
            onClick={() => methods.handleSubmit(handleSave)()}
          >
            Save Measurements
          </Button>
        </div>
      </LogForm>
    </Styles>
  )

  return (
    <MeasurementsLogContext.Provider value={contextValue}>
      <FormProvider {...methods}>
        {isMobile ? (
          <MobilePage
            title="Log Measurements"
            headerSpacing={isClient(type) ? undefined : 20}
            actionComponent={
              <Button onClick={() => methods.handleSubmit(handleSave)()}>
                Save
              </Button>
            }
            headerTopComponent={
              <HeaderLink to={backTo}>Back to Measurements</HeaderLink>
            }
          >
            {content}
          </MobilePage>
        ) : (
          content
        )}
      </FormProvider>
    </MeasurementsLogContext.Provider>
  )
}
