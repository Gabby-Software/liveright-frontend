import { CreditIcon } from '../../../assets/media/icons'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { classes } from '../../../pipes/classes.pipe'
import { ButtonProps } from '../button/button.types'
import Button from './credit-button.styles'

interface CreditsButtonProps extends ButtonProps {
  count: number
  color?: 'secondary'
  readOnly?: boolean
}

export default function CreditsButton({
  count,
  className,
  color,
  readOnly,
  ...props
}: CreditsButtonProps) {
  const { t } = useTranslation()
  const off = count <= 0
  return (
    <Button
      className={classes('credits-btn', className)}
      {...props}
      $off={off}
      $color={color}
      $readOnly={readOnly}
    >
      <div className="credits-btn__items">
        <CreditIcon />
        <span>{t('buttons:current-credits')}</span>
      </div>

      <span className="credits-btn__count">{count || '-'}</span>
    </Button>
  )
}
