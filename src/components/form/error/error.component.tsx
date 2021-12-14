import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Styles from './error.styles'

export interface ErrorProps {
  name?: any
  standalone?: string
  size?: 'sm'
}

export default function Error({ name, standalone, size }: ErrorProps) {
  const { t } = useTranslation()

  if (standalone) {
    return <Styles $standalone={standalone}>{standalone}</Styles>
  }

  const msg =
    typeof name === 'string'
      ? t(`errors:${name}`)
      : typeof name.message === 'string'
      ? t(`errors:${name.message}`)
      : t(`errors:${name.message.key}`, name.message.values)

  return <Styles $size={size}>{msg}</Styles>
}
