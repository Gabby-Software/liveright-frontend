import { useFormikContext } from 'formik'
import React from 'react'

import { InfoIcon } from '../../../../../assets/media/icons'
import Card from '../../../../../components/cards/card/card.component'
import DatePicker from '../../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../../components/form/select/select.component'
import Textarea from '../../../../../components/form/textarea/textarea.component'
import TimePicker from '../../../../../components/form/time-picker/time-picker.component'
import Tooltip from '../../../../../components/tooltip/tooltip.component'
import { serviceTypeOptions } from '../../../../../enums/service-type.enum'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import AddSessionCredits from '../add-session-credits/add-session-credits.component'
import AddSessionDelete from '../add-session-delete/add-session-delete.component'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import AddSessionSubmit from '../add-session-submit/add-session-submit.component'
import Styles from './add-session-fields-desktop.styles'

interface Props {
  session?: SessionType
  onClose?: () => void
}

const AddSessionFieldsDesktop: React.FC<Props> = (props) => {
  const { session, onClose } = props
  const { t } = useTranslation()
  const { values, setFieldValue } = useFormikContext<AddSessionFormType>()

  return (
    <Styles>
      <Card className="add-session__form-card">
        <h3 className="add-session__form-title">
          {session
            ? t('sessions:reschedule-title')
            : t('sessions:schedule-for')}
        </h3>

        <div className="add-session__form-grid">
          <DatePicker
            id="add-session-date"
            label={t('sessions:date')}
            value={values.date}
            onChange={(e, date) => setFieldValue('date', date)}
            name="date"
          />

          <TimePicker
            id="add-session-time"
            value={values.time}
            label={t('sessions:time')}
            onChange={(e, date) => setFieldValue('time', date)}
            name="time"
          />
          <TimePicker
            id="add-sessions-duration"
            value={values.duration}
            label={t('sessions:duration')}
            onChange={(e, date) => setFieldValue('duration', date)}
            name="duration"
          />
          <div className="add-session__type-wrapper">
            <Select
              id="add-session-type"
              name={'type'}
              label={t('sessions:type')}
              placeholder={t('sessions:select-type')}
              options={serviceTypeOptions}
              value={values.type}
              disabled={!!session}
              onChange={(e) => setFieldValue('type', e)}
            />

            {!!session && (
              <p className="add-session__want-change">
                {t('sessions:want-to-change')}

                <Tooltip
                  title={t('sessions:change-type-hint')}
                  placement="right"
                >
                  <InfoIcon />
                </Tooltip>
              </p>
            )}
          </div>
        </div>

        <Textarea
          id="add-session-notes"
          value={values.notes}
          label={t('sessions:notes')}
          placeholder={t('sessions:type-here')}
          className="add-session__form-item"
          onChange={(e) => setFieldValue('notes', e.target.value)}
        />

        {!session && <AddSessionCredits />}

        <AddSessionSubmit session={session} />

        {session && (
          <AddSessionDelete session_id={session.id} onClose={onClose} />
        )}
      </Card>
    </Styles>
  )
}

export default AddSessionFieldsDesktop
