import React, { useState } from 'react'

import {
  CaretDownIcon,
  ChatIcon,
  GroupIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../enums/routes.enum'
import useClientAccount from '../../../../hooks/api/accounts/useClientAccount'
import useChatOnline from '../../../../hooks/api/chat/useChatOnline'
import useLastActivity from '../../../../hooks/api/progress/useLastActivity'
import { useChats } from '../../../../modules/chat/contexts/chats.context'
import { classes } from '../../../../pipes/classes.pipe'
import { Wrapper } from './activities-client.styles'
import SwitchClient from './switch-client/switch-client.component'

interface IProps {
  clientId: number
  onClientSwitch: (id: number) => void
  preventClientSwitch?: boolean
}

export default function ActivitiesClient({
  clientId,
  onClientSwitch,
  preventClientSwitch
}: IProps) {
  const [expanded, setExpended] = useState(false)
  const { user, isLoading, account } = useClientAccount(clientId)
  const { lastSeen } = useChatOnline()
  const { findRoomByUserId } = useChats()
  const [switchDialog, setSwitchDialog] = useState(false)

  const { activityValue, activityLabel } = useLastActivity()

  const room = findRoomByUserId(account.id)

  return (
    <>
      <Wrapper>
        <div className={'log-client__main'}>
          <UserBadge
            size="xl"
            avatarOnly
            avatar={user.avatar?.url}
            firstName={user.first_name}
            lastName={user.last_name}
          />

          <div>
            <div className={'log-client__top'}>
              <div className={'log-client__name'}>
                {isLoading
                  ? 'Loading...'
                  : `${user.first_name || ''} ${user.last_name || ''}`}
              </div>

              {!preventClientSwitch && (
                <Button
                  variant="text"
                  size="sm"
                  className={'log-client__switch'}
                  onClick={() => setSwitchDialog(true)}
                >
                  <GroupIcon />
                  <span>Switch Client</span>
                </Button>
              )}
            </div>

            {expanded && (
              <div className={'log-client__bottom'}>
                <div className={'log-client__bottom__item'}>
                  <div className={'log-client__bottom__label'}>
                    Last Active:
                  </div>
                  <div className={'log-client__bottom__value'}>
                    {lastSeen(user.uuid, room?.room.meta?.lastSeenAt)}
                  </div>
                </div>
                <div className={'log-client__bottom__separator'} />
                <div className={'log-client__bottom__item'}>
                  <div className={'log-client__bottom__label'}>
                    {activityLabel}
                  </div>
                  <div className={'log-client__bottom__value'}>
                    {activityValue}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={'log-client__actions'}>
          {expanded && (
            <IconButton
              to={`${Routes.CHAT}/${room?.room.roomId}`}
              size="sm"
              className="log-client__chat-btn"
              disabled={!room?.room.roomId}
            >
              <ChatIcon />
            </IconButton>
          )}

          <Button
            variant="secondary"
            size="sm"
            disabled={!clientId}
            to={`${Routes.CLIENTS}/${account.id}/profile`}
          >
            Open Profile
          </Button>

          <IconButton
            size="sm"
            onClick={() => setExpended(!expanded)}
            className={classes(
              'log-client__expand',
              expanded && 'log-client__expand__open'
            )}
          >
            <CaretDownIcon />
          </IconButton>
        </div>
      </Wrapper>

      <SwitchClient
        open={switchDialog}
        onClose={() => setSwitchDialog(false)}
        onDone={onClientSwitch}
      />
    </>
  )
}
