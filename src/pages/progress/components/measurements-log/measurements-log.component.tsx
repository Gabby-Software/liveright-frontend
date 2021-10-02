import { useState } from 'react'
import { useParams } from 'react-router'

import Button from '../../../../components/buttons/button/button.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Textarea from '../../../../components/form/textarea/textarea.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import Tabs from '../../../../components/tabs/tabs.component'
import { Subtitle } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
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

export default function MeasurementsLog() {
  const { type } = useAuth()
  const params = useParams<any>()
  const isMobile = useIsMobile()
  const [isPhoto, setPhoto] = useState(false)
  const [isGoals, setGoals] = useState(false)
  const [logType, setLogType] = useState('checkIn')

  const backTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_MEASUREMENTS
    : getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.id })

  const content = (
    <Styles>
      {!isMobile && (
        <>
          <MobileBack to={backTo} alias="goals" />
          <Subtitle size="sm" className="log-measurements__title">
            Log Measurements
          </Subtitle>
        </>
      )}

      {!isClient(type) ? isMobile ? <ClientInfoMobile /> : <LogClient /> : null}

      <LogForm>
        <div>
          <LogDateCard>
            <DatePicker id="log-measurements-date" label="Logging Date" />
            <DatePicker id="log-measurements-time" label="Logging Time" />
          </LogDateCard>

          <div className="log-measurements__forms">
            <Tabs
              activeKey={logType}
              onChange={setLogType}
              tabs={[
                {
                  label: 'Check-In',
                  key: 'checkIn',
                  renderContent: CheckInForm
                },
                {
                  label: 'Skinfold',
                  key: 'skinfold',
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

            {isPhoto && <PhotoForm />}
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

            {isGoals && <GoalsForm className="log-measurements__goals-form" />}
          </div>

          <div>
            <Textarea
              id="log-measurement-notes"
              label="Comments/Notes"
              placeholder="Add note..."
            />
          </div>
        </div>

        <div>
          <Button className="log-measurements__submit">
            Save Measurements
          </Button>
        </div>
      </LogForm>
    </Styles>
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
