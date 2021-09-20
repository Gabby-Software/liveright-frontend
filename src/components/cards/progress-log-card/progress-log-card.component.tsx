import { useTranslation } from '../../../modules/i18n/i18n.hook'
import UserBadge from '../../user-badge/user-badge.component'
import { Styles } from './progress-log-card.styles'

interface ProgressLogCardProps {
  date: string
  quality: string
  sleepData?: string
  napData?: string
  value?: string
}

export default function ProgressLogCard({
  date = '',
  quality = '',
  sleepData,
  napData,
  value
}: ProgressLogCardProps) {
  const { t } = useTranslation()
  return (
    <Styles $quality={quality}>
      <div className="progress-log-card__head">
        <p className="progress-log-card__title">{date}</p>

        <div className="progress-log-card__badge">
          {t(`progress:${quality}`) || '-'}
        </div>
      </div>

      <div className="progress-log-card__reported">
        <UserBadge size="sm" avatarOnly />
        <p className="progress-log-card__reported-text">Reported By You</p>
      </div>

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
