import React, { useState } from 'react'
import { useParams } from 'react-router'

import {
  CaretDownIcon,
  ChatIcon,
  GroupIcon
} from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../components/buttons/icon-button/icon-button.component'
import UserBadge from '../../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../../enums/routes.enum'
import useClientAccount from '../../../../../hooks/api/accounts/useClientAccount'
import useChatOnline from '../../../../../hooks/api/chat/useChatOnline'
import useLastActivity from '../../../../../hooks/api/progress/useLastActivity'
import { useChats } from '../../../../../modules/chat/contexts/chats.context'
import { classes } from '../../../../../pipes/classes.pipe'
import SwitchClient from '../../../../progress/components/switch-client/switch-client.component'
import { Wrapper } from './log-client.styles'

export default function LogClient({
  route = Routes.PROGRESS_HEALTH_DATA
}: {
  route?: string
}) {
  const [expanded, setExpended] = useState(false)
  const params = useParams<any>()
  const { user, isLoading } = useClientAccount(params.clientId)
  const { lastSeen } = useChatOnline()
  const { findRoomByUserId } = useChats()
  const [switchDialog, setSwitchDialog] = useState(false)

  const { activityValue, activityLabel } = useLastActivity()

  const room = findRoomByUserId(params.clientId)
  return (
    <>
      <Wrapper>
        <div className={'log-client__main'}>
          <UserBadge
            key={user.id}
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

              <Button
                variant="text"
                size="sm"
                className={'log-client__switch'}
                onClick={() => setSwitchDialog(true)}
              >
                <GroupIcon />
                <span>Switch Client</span>
              </Button>
            </div>

            {expanded && (
              <div className={'log-client__bottom'}>
                <div className={'log-client__bottom__item'}>
                  <div className={'log-client__bottom__label'}>
                    Last Active:
                  </div>
                  <div className={'log-client__bottom__value'}>
                    {params.clientId
                      ? lastSeen(user.uuid, room?.room.meta?.lastSeenAt)
                      : '-'}
                  </div>
                </div>
                <div className={'log-client__bottom__separator'} />
                <div className={'log-client__bottom__item'}>
                  <div className={'log-client__bottom__label'}>
                    {activityLabel}
                  </div>
                  <div className={'log-client__bottom__value'}>
                    {params.clientId ? activityValue : '-'}
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
            to={`${Routes.CLIENTS}/${params.clientId}/profile`}
            disabled={!params.clientId}
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
        route={route}
        open={switchDialog}
        onClose={() => setSwitchDialog(false)}
      />
    </>
  )
}
