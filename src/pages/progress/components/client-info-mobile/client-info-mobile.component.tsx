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
import SwitchClient from '../switch-client/switch-client.component'
import { Styles } from './client-info-mobile.styles'

export default function ClientInfoMobile() {
  const params = useParams<any>()
  const { user } = useClientAccount(params.id)
  const [opened, setOpened] = useState(false)
  const [switchClient, setSwitchClient] = useState(false)
  return (
    <>
      <Styles className="progress__client-card">
        <div className="progress__client-card-head">
          <div className="progress__client-card-badge">
            <UserBadge
              avatar={user.avatar?.url}
              firstName={user.first_name}
              lastName={user.last_name}
              text="semi-bold"
              size="lg"
            />

            {opened && (
              <IconButton size="sm" className="progress__client-card-link">
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
              Last Active:<span> Yesterday</span>
            </p>
            <p className="progress__client-card-text">
              Last Activity on Health Data:<span> 22-05-2021</span>
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