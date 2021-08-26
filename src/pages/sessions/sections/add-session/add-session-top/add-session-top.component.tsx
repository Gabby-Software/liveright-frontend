import { Field, FieldProps, useFormikContext } from 'formik'
import moment from 'moment'
import React, { useMemo } from 'react'

import { ProfileIcon } from '../../../../../assets/media/icons'
import CreditsButton from '../../../../../components/buttons/credits-button/credits-button.component'
import Card from '../../../../../components/cards/card/card.component'
import CurrentDateCard from '../../../../../components/cards/current-date-card/current-date-card.component'
import UserBadgeCard from '../../../../../components/cards/user-bardge-card/user-badge-card.component'
import Select from '../../../../../components/form/select/select.component'
import { useClients } from '../../../../../hooks/clients.hook'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import Styles from './add-session-top.styles'

interface Props {
  session?: SessionType
}

const AddSessionTop: React.FC<Props> = (props) => {
  const { session } = props
  const { t } = useTranslation()
  const clients = useClients()
  const clientsData = useMemo(
    () => clients.data.data.filter((it) => it.is_active),
    [clients]
  )
  const { values, setFieldValue } = useFormikContext<AddSessionFormType>()

  const selectedClient = useMemo(
    () => clientsData.find((it) => it.id === Number(values?.client_id)),
    [clientsData, values.client_id]
  )

  return (
    <Styles>
      {!session && (
        <Select
          prefix={<ProfileIcon />}
          className="add-session__client-select"
          id="add-sessions-id"
          placeholder={t('sessions:select-client')}
          onChange={(e) => setFieldValue('client_id', e)}
          options={clientsData.map(({ first_name, last_name, id }) => {
            return {
              label: `${first_name} ${last_name}`,
              value: id.toString()
            }
          })}
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
          <Field name={'sessions'}>
            {({ field }: FieldProps) => (
              <CreditsButton
                className="add-session__credit-btn"
                count={field.value}
                readOnly
              />
            )}
          </Field>
        </div>
      )}

      {session?.starts_at && <CurrentDateCard date={session.starts_at} />}
      {session?.client_request && (
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
      )}
    </Styles>
  )
}

export default AddSessionTop
