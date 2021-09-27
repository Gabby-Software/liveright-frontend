import React, { useState } from 'react'
import { useParams } from 'react-router'

import {
  CaretDownIcon,
  ChatIcon,
  UsersIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../enums/routes.enum'
import useClientAccount from '../../../../hooks/api/accounts/useClientAccount'
import useChatOnline from '../../../../hooks/api/chat/useChatOnline'
import useHealth from '../../../../hooks/api/progress/useHealth'
import { useChats } from '../../../../modules/chat/contexts/chats.context'
import SwitchClient from '../switch-client/switch-client.component'
import { Styles } from './client-info-mobile.styles'

export default function ClientInfoMobile() {
  const params = useParams<any>()
  const { user } = useClientAccount(params.id)
  const [opened, setOpened] = useState(false)
  const [switchClient, setSwitchClient] = useState(false)
  const { lastSeen } = useChatOnline()
  const { findRoomByUserId } = useChats()

  const room = findRoomByUserId(params.id)

  const { health } = useHealth({
    filter: {
      account_id: params.id
    },
    per_page: 1
  })

  const data = health[0] || {}

  return (
    <>
      <Styles className="progress__client-card">
        <div className="progress__client-card-head">
          <div className="progress__client-card-badge">
            <UserBadge
              key={params.id}
              avatar={user.avatar?.url}
              firstName={user.first_name}
              lastName={user.last_name}
              text="semi-bold"
              size="lg"
            />

            {opened && (
              <IconButton
                size="sm"
                className="progress__client-card-link"
                to={`${Routes.CHAT}/${room?.room.roomId}`}
              >
                <ChatIcon />
              </IconButton>
            )}
          </div>

          <IconButton
            size="sm"
            className="progress__client-card-expand"
            onClick={() => setOpened(!opened)}
          >
            <CaretDownIcon />
          </IconButton>
        </div>

        {opened && (
          <div className="progress__client-card-info">
            <p className="progress__client-card-text">
              Last Active:
              <span> {lastSeen(user.uuid, room?.room.meta?.lastSeenAt)}</span>
            </p>
            <p className="progress__client-card-text">
              Last Activity on Health Data:<span> {data.date || '-'}</span>
            </p>
          </div>
        )}

        <div className="progress__client-card-actions">
          <Button
            variant="text"
            size="sm"
            className="progress__client-card-switch"
            onClick={() => setSwitchClient(true)}
          >
            <UsersIcon />
            Switch Client
          </Button>

          <Button
            variant="secondary"
            size="sm"
            to={Routes.CLIENTS + `/${params.id}/profile`}
          >
            Open Profile
          </Button>
        </div>
      </Styles>

      <SwitchClient
        open={switchClient}
        onClose={() => setSwitchClient(false)}
      />
    </>
  )
}
