import { useFormikContext } from 'formik'
import moment from 'moment'
import React, { useEffect } from 'react'

import { ProfileIcon } from '../../../../../assets/media/icons'
import CreditsButton from '../../../../../components/buttons/credits-button/credits-button.component'
import Card from '../../../../../components/cards/card/card.component'
import CurrentDateCard from '../../../../../components/cards/current-date-card/current-date-card.component'
import UserBadgeCard from '../../../../../components/cards/user-bardge-card/user-badge-card.component'
import ClientSelect from '../../../../../components/form/client-select/client-select.component'
import useClients from '../../../../../hooks/api/clients/useClients'
import useClientCredits from '../../../../../hooks/api/credits/useClientCredits'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import Styles from './add-session-top.styles'

interface Props {
  session?: SessionType
  onCredits?: (credits: number) => void
}

const AddSessionTop: React.FC<Props> = (props) => {
  const { session, onCredits } = props
  const { t } = useTranslation()
  const { clients } = useClients()

  const { values, setFieldValue } = useFormikContext<AddSessionFormType>()
  const isMobile = useIsMobile()

  const selectedClient = clients.find(
    (row) => row.id === Number(values.client_id)
  )

  const { credits, isLoading } = useClientCredits(selectedClient?.id)

  useEffect(() => {
    onCredits?.(credits)
  }, [credits])

  return (
    <Styles>
      {!session && (
        <ClientSelect
          includeAll={false}
          prefix={<ProfileIcon />}
          className="add-session__client-select"
          id="add-sessions-id"
          placeholder={t('sessions:select-client')}
          value={values.client_id}
          onChange={(e) => setFieldValue('client_id', e)}
          name="client_id"
        />
      )}

      {(selectedClient || session?.client?.id) && (
        <div className="add-session__head">
          <Card className="add-session__head-card">
            <UserBadgeCard
              img={
                selectedClient?.avatar?.url ||
                session?.client?.user?.avatar?.url
              }
              lastName={
                selectedClient?.last_name ||
                session?.client?.user?.first_name ||
                ''
              }
              firstName={
                selectedClient?.first_name ||
                session?.client?.user?.last_name ||
                ''
              }
              userRole="Client"
            />
          </Card>

          {!isMobile && (
            <CreditsButton
              className="add-session__credit-btn"
              count={credits}
              loading={isLoading}
              readOnly
            />
          )}
        </div>
      )}

      {session?.client_request ? (
        <CurrentDateCard
          timeLabel={t('sessions:requested-time')}
          dateLabel={t('sessions:requested-date')}
          date={moment
            .utc(
              session?.client_request?.date +
                ' ' +
                session?.client_request?.time,
              'YYYY-MM-DD HH:mm:ss'
            )
            .toISOString()}
        />
      ) : session?.starts_at ? (
        <CurrentDateCard date={session.starts_at} />
      ) : null}
    </Styles>
  )
}

export default AddSessionTop
