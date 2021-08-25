import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ChatIcon } from '../../../../../assets/media/icons/chat.svg'
import { ReactComponent as ArrowIcon } from '../../../../../assets/media/icons/down-arrow.svg'
import { ReactComponent as UsersIcon } from '../../../../../assets/media/icons/users.svg'
import profilePlaceholder from '../../../../../assets/media/profile-placeholder.jpg'
import FormButton from '../../../../../components/forms/form-button/form-button.component'
import { Routes } from '../../../../../enums/routes.enum'
import { classes } from '../../../../../pipes/classes.pipe'
import { BG, StyledAvatar, Wrapper } from './log-client-mobile.styles'

const LogClientMobile: FC<{}> = () => {
  const [expended, setExpended] = useState(false)
  return (
    <BG>
      <Wrapper>
        {expended ? (
          <div className={'log-client__label'}>Adding/Viewing data for</div>
        ) : null}
        <div className={'log-client__body'}>
          <StyledAvatar placeholder={'YT'} url={profilePlaceholder} />
          <div className={'log-client__name'}>John Travolta</div>
          {expended ? (
            <Link to={Routes.CHAT}>
              <ChatIcon />
            </Link>
          ) : null}
        </div>
        {expended ? (
          <div className={'log-client__data'}>
            <div className={'log-client__data__item'}>
              <div className={'log-client__data__label'}>Last Active:</div>
              <div className={'log-client__data__value'}>Yesterday</div>
            </div>
            <div className={'log-client__data__item'}>
              <div className={'log-client__data__label'}>
                Last Activity on Health Data:
              </div>
              <div className={'log-client__data__value'}>22-05-2021</div>
            </div>
          </div>
        ) : null}
        <div className={'log-client__actions'}>
          <div className={'log-client__switch'}>
            <UsersIcon />
            <span>Switch Client</span>
          </div>
          <Link to={Routes.CLIENTS} className={'log-client__link'}>
            <FormButton type={'text'}>Open Profile</FormButton>
          </Link>
        </div>
        <ArrowIcon
          className={classes(
            'log-client__expend',
            expended && 'log-client__expend__open'
          )}
          onClick={() => setExpended(!expended)}
        />
      </Wrapper>
    </BG>
  )
}
export default LogClientMobile
