import { CaretRightIcon } from '../../../assets/media/icons'
import useChatOnline from '../../../hooks/api/chat/useChatOnline'
import { useChats } from '../../../modules/chat/contexts/chats.context'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Button from '../../buttons/button/button.component'
import UserBadge from '../../user-badge/user-badge.component'
import { Styles } from './client-progress-card.styles'

interface ClientProgressCardProps {
  firstName: string
  lastName: string
  avatar?: string
  to: string
  id?: number
  uuid: string
}

export default function ClientProgressCard({
  firstName,
  lastName,
  avatar,
  to,
  id,
  uuid
}: ClientProgressCardProps) {
  const { t } = useTranslation()
  const { findRoomByUserId } = useChats()
  const { lastSeen } = useChatOnline()

  const room = findRoomByUserId(id)

  return (
    <Styles>
      <div className="client-progress-card__header">
        <UserBadge
          size="lg"
          text="semi-bold"
          firstName={firstName}
          lastName={lastName}
          avatar={avatar}
          avatarOnly
          className="client-progress-card__avatar"
        />

        <div className="client-progress-card__header-content">
          <div className="client-progress-card__header-name-container">
            <h4 className="client-progress-card__header-name">
              {firstName || ''} {lastName || ''}
            </h4>

            <Button
              variant="text"
              className="client-progress-card__header-link"
              to={to}
            >
              {t('view-details')}
              <CaretRightIcon />
            </Button>
          </div>

          <p className="client-progress-card__header-subtitle">
            Last Activity:{' '}
            <span>{lastSeen(uuid, room?.room.meta?.lastSeenAt)}</span>
          </p>
        </div>
      </div>
    </Styles>
  )
}
