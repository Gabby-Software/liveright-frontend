import { useParams } from 'react-router'

import { WeightIcon } from '../../../../assets/media/icons'
import Alert from '../../../../components/alerts/alert/alert.component'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import ProgressEditCard from '../../../../components/cards/progress-edit-card/progress-eidt-card.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { isClient } from '../../../../utils/api/auth'
import { getRoute } from '../../../../utils/routes'
import LogClient from '../../../progress-log/log-health-data/components/log-client/log-client.component'
import ClientInfoMobile from '../client-info-mobile/client-info-mobile.component'
import { Styles } from './goals-log.style'

export default function GoalsLog() {
  const { type } = useAuth()
  const params = useParams<any>()
  const isMobile = useIsMobile()

  const backTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_GOALS
    : getRoute(Routes.PROGRESS_GOALS, { id: params.id })

  const content = (
    <Styles>
      {!isMobile && (
        <>
          <MobileBack to={backTo} alias="goals" />
          <p className="log-goals__title">Log Goals</p>
        </>
      )}

      {!isClient(type) ? isMobile ? <ClientInfoMobile /> : <LogClient /> : null}

      <div className="log-goals__form">
        <div>
          <Card className="log-goals__form-card log-goals__form-date">
            <DatePicker id="log-goal-start" label="Goal Starts On" />
            <DatePicker id="log-goal-end" label="Goal Ends By" />
          </Card>

          <ProgressEditCard
            icon={<WeightIcon />}
            title="Lean Mass(kg)"
            InputProps={{
              id: 'log-health-mass',
              label: 'Target Mass',
              placeholder: '80'
            }}
          />

          <ProgressEditCard
            icon={<WeightIcon />}
            title="Body Weight(kg)"
            InputProps={{
              id: 'log-health-weight',
              label: 'Target Weight',
              placeholder: '80'
            }}
          />

          <ProgressEditCard
            icon={<WeightIcon />}
            title="Fit Percentage %"
            InputProps={{
              id: 'log-health-fat',
              label: 'Target Fat',
              placeholder: '80'
            }}
          />
        </div>

        <div>
          <Button className="log-goals__submit">Save Goals</Button>

          <Alert message="Your old targets set from 07/05/2021 to 07/07/2021 will be overwritten after you save your new goals" />
        </div>
      </div>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Log Goals"
      headerSpacing={20}
      actionComponent={<Button>Save Goals</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
