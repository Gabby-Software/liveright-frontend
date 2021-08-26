import { useFormikContext } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'

import { CalendarBoldIcon, InfoIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import DatePicker from '../../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../../components/form/select/select.component'
import Textarea from '../../../../../components/form/textarea/textarea.component'
import TimePicker from '../../../../../components/form/time-picker/time-picker.component'
import Tooltip from '../../../../../components/tooltip/tooltip.component'
import { serviceTypeOptions } from '../../../../../enums/service-type.enum'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import AddSessionCalendar from '../add-session-calendar/add-session-calendar.component'
import AddSessionCredits from '../add-session-credits/add-session-credits.component'
import AddSessionDelete from '../add-session-delete/add-session-delete.component'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import AddSessionSubmit from '../add-session-submit/add-session-submit.component'
import Styles from './add-session-fields-mobile.styles'

interface Props {
  session?: SessionType
  onClose?: () => void
}

const AddSessionFieldsMobile: React.FC<Props> = (props) => {
  const { session, onClose } = props
  const { t } = useTranslation()
  const { values, setFieldValue } = useFormikContext<AddSessionFormType>()
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false)
  const isToday = moment(values.date).isSame(moment(), 'days')

  return (
    <Styles>
      <Card>
        <div className={'add-session__form'}>
          <h3 className={'add-session__title'}>{t('sessions:schedule-for')}</h3>

          <DatePicker
            id="add-session-date"
            label={t('sessions:schedule-date')}
            value={values.date}
            onChange={(e, date) => setFieldValue('date', date)}
            className="add-session__form-date"
          />

          <div className="add-session__calendar-wrapper">
            <Button
              variant="text"
              className="add-session__toggle-calendar-btn"
              onClick={() => setIsShowCalendar(!isShowCalendar)}
            >
              <CalendarBoldIcon />
              <span>
                {t(
                  isShowCalendar
                    ? 'sessions:hide-calendar'
                    : 'sessions:show-calendar'
                )}
              </span>
            </Button>

            {isShowCalendar && <AddSessionCalendar />}
          </div>

          <TimePicker
            id="add-session-time"
            disabledUntilNow={isToday}
            value={values.time}
            onChange={(e, date) => setFieldValue('time', date)}
            label={t('sessions:schedule-time')}
            className="add-session__form-item"
          />
          <TimePicker
            id="add-session-duration"
            disabled={!!session}
            label={t('sessions:duration')}
            value={values.duration}
            onChange={(e, date) => setFieldValue('duration', date)}
            className="add-session__form-item"
          />

          <Select
            id="add-session-type"
            disabled={!!session}
            name={'type'}
            label={t('sessions:type')}
            options={serviceTypeOptions}
            value={values.type}
            className="add-session__form-item"
            onChange={(e) => setFieldValue('type', e)}
          />

          {!!session && (
            <p className="add-session__want-change">
              {t('sessions:want-to-change')}

              <Tooltip title="Lorem Ipsum is simple." placement="right">
                <InfoIcon />
              </Tooltip>
            </p>
          )}

          <Textarea
            id="add-session-notes"
            label={t('sessions:notes')}
            value={values.notes}
            onChange={(e) => setFieldValue('notes', e.target.value)}
            className="add-session__form-notes"
          />

          {!session && <AddSessionCredits />}

          <AddSessionSubmit session={session} />
          {session && (
            <AddSessionDelete onClose={onClose} session_id={session.id} />
          )}
        </div>
      </Card>
    </Styles>
  )
}

export default AddSessionFieldsMobile
