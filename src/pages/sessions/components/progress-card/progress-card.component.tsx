import { ReactNode } from 'react'

import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { ProgressCardStyles } from './progress-card.styles'

interface ProgressCardProps {
  title: string
  current: number
  target: number
  money?: boolean
  earn?: number
  icon: ReactNode
}

export default function ProgressCard({
  title,
  current,
  target,
  money,
  earn,
  icon
}: ProgressCardProps) {
  const { t } = useTranslation()
  const off = target - current > 0
  const progress = off ? (current * 100) / target : 100
  const diff = current - target
  const suffix = money ? 'AED' : ''
  return (
    <ProgressCardStyles off={off} progress={progress}>
      <div className="progress-card__content">
        <div className="progress-card__preview">
          <div className="progress-card__title-container">
            <h5 className="progress-card__title">{title}</h5>

            <div className="progress-card__target-container">
              <span className="progress-card__progress">
                <span>{diff > 0 ? '+' + diff : diff}</span> {suffix}
              </span>
              <span className="progress-card__target-label">
                {off ? 'Off target' : 'Exceeds the target'}
              </span>
            </div>
          </div>

          <div className="progress-card__badge">{icon}</div>
        </div>

        <div className="progress-card__progress-values">
          <p className="progress-card__progress-value">
            {t('sessions:current')}{' '}
            <span>
              {current} {suffix}
            </span>
          </p>
          <p className="progress-card__progress-value">
            {t('sessions:target')}{' '}
            <span>
              {target} {suffix}
            </span>
          </p>
        </div>
      </div>

      <div className="progress-card__bar">
        {!!earn && (
          <p className="progress-card__bar-hint">
            {t('sessions:you-earn')} {asMoney(earn)} <span>AED</span>
          </p>
        )}
      </div>
    </ProgressCardStyles>
  )
}
