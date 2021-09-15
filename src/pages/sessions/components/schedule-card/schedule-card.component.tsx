import moment from 'moment'

import { ArrowRightBigIcon, CalendarIcon } from '../../../../assets/media/icons'
import { ReactComponent as RightArrowIcon } from '../../../../assets/media/icons/caret-right.svg'
import Button from '../../../../components/buttons/button/button.component'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import {
  DATE_FORMAT,
  MONTH_RENDER_FORMAT,
  TIME_FORMAT,
  TIME_RENDER_FORMAT
} from '../../../../utils/date'
import { Styles } from './schedule-card.style'

interface ScheduleCardProps {
  userAvatar: string
  firstName: string
  lastName: string
  onEdit?: any
  editTo?: string
  className?: string
  schedule?: boolean
  reschedule?: boolean
  scheduleTime?: string
  scheduleDate?: string
  currentDate?: string
}

export default function ScheduleCard({
  userAvatar,
  firstName,
  lastName,
  onEdit,
  editTo,
  className,
  schedule,
  reschedule,
  scheduleDate,
  scheduleTime,
  currentDate
}: ScheduleCardProps) {
  const { t } = useTranslation()
  const newDate = scheduleDate
    ? moment(scheduleDate, DATE_FORMAT).format(MONTH_RENDER_FORMAT)
    : '-'
  const newTime = scheduleTime
    ? moment.utc(scheduleTime, TIME_FORMAT).format(TIME_RENDER_FORMAT)
    : '-'
  const curDate = currentDate
    ? moment(currentDate).format(MONTH_RENDER_FORMAT)
    : '-'
  const curTime = currentDate
    ? moment.utc(currentDate).format(TIME_RENDER_FORMAT)
    : '-'

  return (
    <Styles className={className}>
      {schedule && (
        <div>
          <p className="schedule-card__title">{t('sessions:requested-time')}</p>
          <p className="schedule-card__subtitle">
            <CalendarIcon />
            <span>
              {t('sessions:schedule-time-value', {
                date: newDate,
                time: newTime
              })}
            </span>
          </p>
        </div>
      )}
      {reschedule && (
        <div>
          <p className="schedule-card__title">
            {t('sessions:reschedule-time')}
          </p>
          <div className="schedule-card__from-to-container">
            <div className="schedule-card__from-to-item">
              <span className="schedule-card__from-to-title">
                {t('sessions:from')}
              </span>
              <span className="schedule-card__from-to-value">{curDate}</span>
              <span className="schedule-card__from-to-value">{curTime}</span>
            </div>

            <ArrowRightBigIcon className="schedule-card__from-to-arrow" />

            <div className="schedule-card__from-to-item">
              <span className="schedule-card__from-to-title">
                {t('sessions:to')}
              </span>
              <span className="schedule-card__from-to-value schedule-card__from-to-value_dark">
                {newDate}
              </span>
              <span className="schedule-card__from-to-value schedule-card__from-to-value_dark">
                {newTime}
              </span>
            </div>
          </div>
        </div>
      )}

      <div>
        <UserBadge
          avatar={userAvatar}
          firstName={firstName}
          lastName={lastName}
        />
        <Button
          size="sm"
          variant="text"
          className="schedule-card__schedule_button"
          onClick={onEdit}
          to={editTo}
        >
          <span>{t('sessions:schedule-now')}</span>
          <RightArrowIcon />
        </Button>
      </div>
    </Styles>
  )
}
