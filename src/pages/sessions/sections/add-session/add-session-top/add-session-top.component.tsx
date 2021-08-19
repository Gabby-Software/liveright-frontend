import { Field, FieldProps, useFormikContext } from 'formik'
import moment from 'moment'
import React, { useMemo } from 'react'

import { ReactComponent as CalendarIcon } from '../../../../../assets/media/icons/calendar.svg'
import { ReactComponent as ClockIcon } from '../../../../../assets/media/icons/clock.svg'
import FormSelect from '../../../../../components/forms/form-select/form-select.component'
import PageSubtitle from '../../../../../components/titles/page-subtitle.styles'
import { useClients } from '../../../../../hooks/clients.hook'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import SessionUserAvatar from '../../../components/session-user-avatar/session-user-avatar.component'
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
  const { values } = useFormikContext<AddSessionFormType>()
  const selectedClient = useMemo(
    () => clientsData.find((it) => it.id === Number(values?.client_id)),
    [clientsData, values.client_id]
  )

  return (
    <Styles>
      <PageSubtitle>{t('sessions:schedule-session')}</PageSubtitle>
      {!session && (
        <FormSelect
          name="client_id"
          label="Please select a client to schedule for..."
          options={clientsData.map(({ first_name, last_name, id }) => {
            return { label: `${first_name} ${last_name}`, value: id.toString() }
          })}
        />
      )}
      {selectedClient ? (
        <div className={'session-top__head'}>
          <SessionUserAvatar
            avatar={selectedClient.avatar}
            last_name={selectedClient.last_name}
            first_name={selectedClient.first_name}
          />
          <Field name={'sessions'}>
            {({ field }: FieldProps) => (
              <div className={'session-top__credits'}>
                <span>{t('sessions:current-credits')}:</span>
                <span>&nbsp;{field.value}</span>
              </div>
            )}
          </Field>
        </div>
      ) : null}
      {session && session.starts_at ? (
        <div className={'session-top__requested'}>
          <div className={'session-top__requested__label'}>
            {session ? t('sessions:current-time') : t('sessions:requested')}
          </div>
          <div className={'session-top__requested__dates'}>
            <div className={'session-top__requested__date'}>
              <CalendarIcon />
              <span>{moment(session?.starts_at).format('YYYY-MM-DD')}</span>
            </div>
            <div className={'session-top__requested__date'}>
              <ClockIcon />
              <span>{moment.utc(session?.starts_at).format('HH:mm')}</span>
            </div>
          </div>
        </div>
      ) : null}
    </Styles>
  )
}

export default AddSessionTop
