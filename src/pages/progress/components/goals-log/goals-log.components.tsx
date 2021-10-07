import moment from 'moment'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import Alert from '../../../../components/alerts/alert/alert.component'
import Button from '../../../../components/buttons/button/button.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Routes } from '../../../../enums/routes.enum'
import useGoals from '../../../../hooks/api/progress/useGoals'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { authReducer } from '../../../../store/reducers/auth.reducer'
import { isClient } from '../../../../utils/api/auth'
import {
  DATE_FORMAT,
  DATE_PRETTY_FORMAT,
  isDateOverlapBetween
} from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import LogClient from '../../../progress-log/log-health-data/components/log-client/log-client.component'
import ClientInfoMobile from '../client-info-mobile/client-info-mobile.component'
import GoalsForm from '../goals-form/goals-form.component'
import LogForm from '../log-form/log-form.component'
import { GOALS_FORM_CONFIG } from './goals-log.config'
import { Styles } from './goals-log.style'

export default function GoalsLog() {
  const { type, id } = useAuth()
  const params = useParams<any>()
  const history = useHistory()
  const isMobile = useIsMobile()

  const { onAdd, goals } = useGoals({
    filter: {
      account_id: params.id || id
    }
  })

  const leanMass = goals.find((goal) => goal.type === 'lean_mass')

  const currentFrom = leanMass?.from
  const currentTo = leanMass?.to

  const methods = useForm(GOALS_FORM_CONFIG)

  const [from, to] = useWatch({
    control: methods.control,
    name: ['from', 'to']
  })

  const isOverlap = isDateOverlapBetween(currentFrom, currentTo, from, to)

  const backTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_GOALS
    : getRoute(Routes.PROGRESS_GOALS, { id: params.id })

  const onSuccess = () => {
    history.push(backTo)
  }

  const handleSave = (values: any) => {
    onAdd(values, onSuccess)
  }

  const curFrom = currentFrom
    ? moment(currentFrom, DATE_FORMAT).format(DATE_PRETTY_FORMAT)
    : ''
  const curTo = currentTo
    ? moment(currentTo, DATE_FORMAT).format(DATE_PRETTY_FORMAT)
    : ''

  const content = (
    <Styles $client={isClient(type)}>
      {!isMobile && (
        <>
          <MobileBack to={backTo} alias="goals" />
          <p className="log-goals__title">Log Goals</p>
        </>
      )}

      {!isClient(type) ? isMobile ? <ClientInfoMobile /> : <LogClient /> : null}

      <LogForm className="log-goals__form">
        <GoalsForm />

        <div>
          <Button
            className="log-goals__submit"
            onClick={() => methods.handleSubmit(handleSave)()}
          >
            Save Goals
          </Button>

          {isOverlap && (
            <Alert
              message={`Your old targets set from ${curFrom} to ${curTo} will be overwritten after you save your new goals`}
            />
          )}
        </div>
      </LogForm>
    </Styles>
  )

  return (
    <FormProvider {...methods}>
      {isMobile ? (
        <MobilePage
          title="Log Goals"
          headerSpacing={isClient(type) ? undefined : 20}
          actionComponent={
            <Button onClick={() => methods.handleSubmit(handleSave)()}>
              Save Goals
            </Button>
          }
          headerTopComponent={
            <HeaderLink to={backTo}>Back to Goals</HeaderLink>
          }
        >
          {content}
        </MobilePage>
      ) : (
        content
      )}
    </FormProvider>
  )
}
