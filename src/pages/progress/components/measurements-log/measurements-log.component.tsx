import { useState } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

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
  SkinfoldForm
} from './measurements-log.forms'
import { Styles } from './measurements-log.styles'

const formConfig = {
  defaultValues: {
    type: 'check_in',
    date: '',
    notes: '',
    images: {}
  }
}

export default function MeasurementsLog() {
  const { type } = useAuth()
  const history = useHistory()
  const params = useParams<any>()
  const isMobile = useIsMobile()
  const [isPhoto, setPhoto] = useState(false)
  const [isGoals, setGoals] = useState(false)

  const { onAdd } = useMeasurements({
    skip: true
  })

  const methods = useForm(formConfig)

  const values = useWatch({
    control: methods.control,
    name: ['type', 'images']
  })
  const logType: string = values[0]
  const images: any = values[1]

  const backTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_MEASUREMENTS
    : getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.id })

  const content = (
    <FormProvider {...methods}>
      <Styles $client={isClient(type)}>
        {!isMobile && (
          <>
            <MobileBack to={backTo} alias="goals" />
            <Subtitle size="sm" className="log-measurements__title">
              Log Measurements
            </Subtitle>
          </>
        )}

        {!isClient(type) ? (
          isMobile ? (
            <ClientInfoMobile />
          ) : (
            <LogClient />
          )
        ) : null}

        <LogForm>
          <div>
            <LogDateCard>
              <Controller
                render={({ field: { name, value } }) => (
                  <DatePicker
                    id="log-measurements-date"
                    label="Logging Date"
                    value={value}
                    onChange={(e, date) => {
                      methods.setValue(name, date)
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
              <DatePicker
                id="log-measurements-time"
                label="Logging Time"
                disabled
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
                <span className="log-measurements__toggle-label">
                  Add Photos
                </span>
              </div>

              {isPhoto && (
                <PhotoForm
                  front={images.front}
                  side={images.side}
                  back={images.back}
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
                <GoalsForm className="log-measurements__goals-form" />
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
              onClick={() => methods.handleSubmit(onAdd)()}
            >
              Save Measurements
            </Button>
          </div>
        </LogForm>
      </Styles>
    </FormProvider>
  )

  return isMobile ? (
    <MobilePage
      title="Log Measurements"
      headerSpacing={isClient(type) ? undefined : 20}
      actionComponent={<Button>Save</Button>}
      headerTopComponent={
        <HeaderLink to={backTo}>Back to Measurements</HeaderLink>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
