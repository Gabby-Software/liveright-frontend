import { InfoIcon } from '../../assets/media/icons'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import Styles from './busy-badge.styles'

interface BusyBadgeProps {
  className?: string
}

export default function BusyBadge({ className }: BusyBadgeProps) {
  const { t } = useTranslation()
  return (
    <Styles className={className}>
      <InfoIcon />
      {t('badges:busy')}
    </Styles>
  )
}
