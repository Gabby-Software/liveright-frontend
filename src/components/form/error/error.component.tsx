import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Styles from './error.styles'

interface ErrorProps {
  name: string
}

export default function Error({ name }: ErrorProps) {
  const { t } = useTranslation()
  return <Styles>{t(`errors:${name}`)}</Styles>
}
