import moment from 'moment'
import React from 'react'

import { LinkIcon, ShowIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import PopOnScroll from '../../../../components/pop-on-scroll/pop-on-scroll.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { notificationIcon } from '../../../../modules/notifications/enums/notification-icon.enum'
import { notificationUrl } from '../../../../modules/notifications/enums/notification-url.enum'
import { NotificationType } from '../../../../types/notifications.type'
import Styles from './notification.styles'

const Notification = ({
  created_at,
  // read_at,
  data,
  type
}: NotificationType) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const { Icon, color } = notificationIcon(type)
  // const EyeIcon = notificationSeen(!!read_at)
  const { url, slug } = notificationUrl(type, data)

  return (
    <PopOnScroll offset={70}>
      <Styles>
        <div className={`notification__icon notification__icon__${color}`}>
          <Icon />
        </div>

        <div className={'notification__data'}>
          <div className={'notification__content'}>{data.message}</div>
          <div className={'notification__datetime'}>
            {moment(created_at).format('DD.MM.YYYY | hh:mm')}
          </div>
        </div>

        {!url ? null : isMobile ? (
          <IconButton size="sm" className="notification__link" to={url}>
            <LinkIcon />
          </IconButton>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              to={url}
              className="notification__action"
            >
              {t('notifications:go-to', { type: slug })}
            </Button>

            <ShowIcon />
          </>
        )}
      </Styles>
    </PopOnScroll>
  )
}

export default Notification
