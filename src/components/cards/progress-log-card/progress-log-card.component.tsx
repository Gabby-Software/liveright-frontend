import { ReactNode } from 'react'

import { useAuth } from '../../../hooks/auth.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { isClient } from '../../../utils/api/auth'
import UserBadge from '../../user-badge/user-badge.component'
import { Styles } from './progress-log-card.styles'

interface ProgressLogCardProps {
  date: string
  quality: string
  sleepData?: string
  napData?: string
  value?: string
  showQuality?: boolean
  loggedBy?: number
  component?: ReactNode
}

export default function ProgressLogCard({
  date = '',
  quality = '',
  sleepData,
  napData,
  value,
  showQuality,
  loggedBy,
  component
}: ProgressLogCardProps) {
  const auth = useAuth()
  const { t } = useTranslation()

  const reportedByMe = loggedBy === auth.id

  return (
    <Styles $quality={quality}>
      <div className="progress-log-card__head">
        <p className="progress-log-card__title">{date}</p>

        {showQuality && (
          <div className="progress-log-card__badge">
            {t(`progress:${quality}`) || '-'}
          </div>
        )}
      </div>

      <div className="progress-log-card__reported">
        {reportedByMe && (
          <UserBadge
            size="sm"
            avatarOnly
            avatar={auth?.avatar?.url}
            firstName={auth?.first_name}
            lastName={auth?.last_name}
          />
        )}
        <p className="progress-log-card__reported-text">
          Reported By{' '}
          {loggedBy === auth.id
            ? 'You'
            : isClient(auth.type)
            ? 'Trainer'
            : 'Client'}
        </p>
      </div>

      {sleepData && (
        <div>
          <p className="progress-log-card__sleep-text">{sleepData}</p>
          <p className="progress-log-card__sleep-text">{napData || 'No Nap'}</p>
        </div>
      )}
      {value && <p className="progress-log-card__value">{value}</p>}

      {component}
    </Styles>
  )
}

interface ProgressLogCardRowProps {
  label: string
  value: string
}

export function ProgressLogCardRow({ label, value }: ProgressLogCardRowProps) {
  return (
    <p className="progress-log-card__row">
      <span className="progress-log-card__row-label">{label}</span>
      <span className="progress-log-card__row-value">{value}</span>
    </p>
  )
}
