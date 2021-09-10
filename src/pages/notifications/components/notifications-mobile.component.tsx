import Button from '../../../components/buttons/button/button.component'
import ChatIcon from '../../../components/chat-icon/chat-icon.component'
import { Routes } from '../../../enums/routes.enum'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Content from './content/content.component'

export default function NotificationsMobile() {
  const { t } = useTranslation()
  return (
    <MobilePage
      title={t('notifications:title-mobile')}
      headerTitleIcon={<ChatIcon />}
      actionComponent={
        <Button to={Routes.NOTIFICATIONS_SETTINGS}>
          {t('notifications:manage-sessions')}
        </Button>
      }
    >
      <Content />
    </MobilePage>
  )
}
