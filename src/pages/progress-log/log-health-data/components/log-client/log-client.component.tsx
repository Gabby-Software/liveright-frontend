import React, { useState } from 'react'
import { useParams } from 'react-router'

import {
  CaretDownIcon,
  ChatIcon,
  UsersIcon
} from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../components/buttons/icon-button/icon-button.component'
import UserBadge from '../../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../../enums/routes.enum'
import useClientAccount from '../../../../../hooks/api/accounts/useClientAccount'
import useChatOnline from '../../../../../hooks/api/chat/useChatOnline'
import useHealth from '../../../../../hooks/api/progress/useHealth'
import { classes } from '../../../../../pipes/classes.pipe'
import { Wrapper } from './log-client.styles'

interface LogClientProps {
  onSwitch: () => void
}

const LogClient = ({ onSwitch }: LogClientProps) => {
  const [expanded, setExpended] = useState(false)
  const params = useParams<any>()
  const { user, isLoading } = useClientAccount(params.id)
  const { isOnline } = useChatOnline()

  const { health } = useHealth({
    filter: {
      account_id: params.id
    },
    per_page: 1
  })

  const data = health[0] || {}

  return (
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
              onClick={onSwitch}
            >
              <UsersIcon />
              <span>Switch Client</span>
            </Button>
          </div>

          {expanded && (
            <div className={'log-client__bottom'}>
              <div className={'log-client__bottom__item'}>
                <div className={'log-client__bottom__label'}>Last Active:</div>
                <div className={'log-client__bottom__value'}>
                  {isOnline(user.uuid) ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className={'log-client__bottom__separator'} />
              <div className={'log-client__bottom__item'}>
                <div className={'log-client__bottom__label'}>
                  Last Activity on Health Data:
                </div>
                <div className={'log-client__bottom__value'}>
                  {data.date || '-'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={'log-client__actions'}>
        {expanded && (
          <IconButton
            to={Routes.CHAT}
            size="sm"
            className="log-client__chat-btn"
          >
            <ChatIcon />
          </IconButton>
        )}

        <Button variant="secondary" size="sm" to={Routes.CLIENTS}>
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
  )
}
export default LogClient
