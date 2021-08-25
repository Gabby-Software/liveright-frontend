import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ChatIcon } from '../../../../../assets/media/icons/chat.svg'
import { ReactComponent as ArrowIcon } from '../../../../../assets/media/icons/down-arrow.svg'
import { ReactComponent as UsersIcon } from '../../../../../assets/media/icons/users.svg'
import profilePlaceholder from '../../../../../assets/media/profile-placeholder.jpg'
import FormButton from '../../../../../components/forms/form-button/form-button.component'
import { Routes } from '../../../../../enums/routes.enum'
import { classes } from '../../../../../pipes/classes.pipe'
import { date } from '../../../../../pipes/date.pipe'
import { StyledAvatar, Wrapper } from './log-client.styles'

const LogClient = () => {
  const [expanded, setExpended] = useState<boolean>(false)
  return (
    <Wrapper>
      {expanded ? (
        <div className={'log-client__label'}>Adding/Viewing Data for</div>
      ) : null}
      <div className={'log-client__body'}>
        <StyledAvatar url={profilePlaceholder} placeholder={'YT'} />
        <div className={'log-client__main'}>
          <div className={'log-client__top'}>
            <div className={'log-client__name'}>Jhon Travolta</div>
            <div className={'log-client__switch'}>
              <UsersIcon />
              <span>Switch Client</span>
            </div>
          </div>
          {expanded ? (
            <div className={'log-client__bottom'}>
              <div className={'log-client__bottom__item'}>
                <div className={'log-client__bottom__label'}>Last Active:</div>
                <div className={'log-client__bottom__value'}>Yesterday</div>
              </div>
              <div className={'log-client__bottom__separator'} />
              <div className={'log-client__bottom__item'}>
                <div className={'log-client__bottom__label'}>
                  Last Activity on Health Data:
                </div>
                <div className={'log-client__bottom__value'}>
                  {date('2021-05-21')}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className={'log-client__actions'}>
          {expanded ? (
            <Link to={Routes.CHAT}>
              <ChatIcon className={'log-client__chat'} />
            </Link>
          ) : null}
          <Link to={Routes.TRAINER}>
            <FormButton type={'text'}>Open Profile</FormButton>
          </Link>
          <ArrowIcon
            onClick={() => setExpended(!expanded)}
            className={classes(
              'log-client__expand',
              expanded && 'log-client__expand__open'
            )}
          />
        </div>
      </div>
    </Wrapper>
  )
}
export default LogClient
