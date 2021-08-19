import React from 'react'
import { useDispatch } from 'react-redux'

import logoCompact from '../../../assets/media/logo-compact.png'
import { Routes } from '../../../enums/routes.enum'
import { onlyGuest } from '../../../guards/guest.guard'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { ACTION_VERIFY_EMAIL_RESEND_REQUEST } from '../../../store/action-types'
import Styles, { Logo, ResendEmail, Wrapper } from '../styles'
import Back from '../styles/back/back.component'

const SignUpConfirmation = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const resendEmail = () => {
    dispatch({ type: ACTION_VERIFY_EMAIL_RESEND_REQUEST })
  }
  return (
    <Styles>
      <Wrapper>
        <Logo alt={'liveright'} src={logoCompact} />
        <h1 className={'forgot-password__title'}>{t('auth:sign-up')}</h1>
        <div className={'forgot-password__hr'} />
        <p className={'forgot-password__desc'}>
          <span>{t('auth:sign-up-confirm-1')}</span>
          <span>{t('auth:sign-up-confirm-2')}</span>
        </p>
        <ResendEmail>
          <span>{t('auth:not-received')}</span>
          <a onClick={resendEmail}>{t('auth:send-again')}</a>
        </ResendEmail>
        <Back to={Routes.LOGIN} />
      </Wrapper>
    </Styles>
  )
}

export default onlyGuest(SignUpConfirmation)
