import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Styles from './error.styles'

interface ErrorProps {
  name?: any
  standalone?: string
}

export default function Error({ name, standalone }: ErrorProps) {
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

  return <Styles>{msg}</Styles>
}
