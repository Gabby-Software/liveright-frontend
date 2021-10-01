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
  weight?: string
  circumference?: string
  skinfold?: string
  bodyFat?: string
  fatMass?: string
  leanMass?: string
}

export default function ProgressLogCard({
  date = '',
  quality = '',
  sleepData,
  napData,
  value,
  showQuality,
  loggedBy,
  weight,
  circumference,
  skinfold,
  bodyFat,
  fatMass,
  leanMass
}: ProgressLogCardProps) {
  const auth = useAuth()
  const { t } = useTranslation()

  const keysValues = {
    weight,
    circumference,
    skinfold,
    bodyFat,
    fatMass,
    leanMass
  }

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

      {Object.keys(keysValues).map((key: any, index) => (
        <p className="progress-log-card__row" key={index}>
          <span className="progress-log-card__row-label">{key}</span>
          <span className="progress-log-card__row-value">
            {(keysValues as any)[key]}
          </span>
        </p>
      ))}
    </Styles>
  )
}
