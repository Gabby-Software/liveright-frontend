import { useAuth } from '../../../hooks/auth.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
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
}

export default function ProgressLogCard({
  date = '',
  quality = '',
  sleepData,
  napData,
  value,
  showQuality,
  loggedBy
}: ProgressLogCardProps) {
  const auth = useAuth()
  const { t } = useTranslation()
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

      {loggedBy === auth?.id && (
        <div className="progress-log-card__reported">
          <UserBadge
            size="sm"
            avatarOnly
            avatar={auth?.avatar?.url}
            firstName={auth?.first_name}
            lastName={auth?.last_name}
          />
          <p className="progress-log-card__reported-text">Reported By You</p>
        </div>
      )}

      {sleepData && (
        <div>
          <p className="progress-log-card__sleep-text">{sleepData}</p>
          <p className="progress-log-card__sleep-text">{napData || 'No Nap'}</p>
        </div>
      )}
      {value && <p className="progress-log-card__value">{value}</p>}
    </Styles>
  )
}
