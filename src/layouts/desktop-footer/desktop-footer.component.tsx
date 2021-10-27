import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  CaretLeftIcon,
  CaretRightIcon,
  LogoutTrainerIcon,
  ProfileCheckTrainerIcon,
  ProfileTrainerIcon,
  RevenueTrainerIcon
} from '../../assets/media/icons'
import Button from '../../components/buttons/button/button.component'
import IconButton from '../../components/buttons/icon-button/icon-button.component'
import UserBadgeCard from '../../components/cards/user-bardge-card/user-badge-card.component'
import { toast } from '../../components/toast/toast.component'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { identity } from '../../pipes/identity.pipe'
import {
  ACTION_LOGOUT_REQUEST,
  ACTION_SWITCH_ACCOUNT_REQUEST
} from '../../store/action-types'
import { AccountType } from '../../types/account.type'
import { FileType } from '../../types/file.type'
import {
  FooterInvisible,
  FooterVisible,
  TrainerFooterInvisible,
  TrainerFooterVisible
} from './desktop-footer.styles'

interface FooterProps {
  switchAccount: () => void
  avatar: FileType | null
  first_name: string
  last_name: string
  open: boolean
  setOpen: (open: boolean) => void
  accounts: AccountType[]
  logout: () => void
  type: string
}

export default function DesktopFooter() {
  const { first_name, last_name, avatar, type, accounts } = useAuth()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()

  const logout = () => {
    dispatch({ type: ACTION_LOGOUT_REQUEST })
  }

  const switchAccount = () => {
    const uuid = accounts.find((acc) => !acc.is_current)?.uuid
    history.push(Routes.HOME)
    dispatch({
      type: ACTION_SWITCH_ACCOUNT_REQUEST,
      payload: {
        uuid,
        onSuccess: () => {
          toast.show({
            type: 'success',
            msg: t('alerts:switch-account-success')
          })
        }
      }
    })
  }
  if (type === userTypes.CLIENT) {
    return (
      <ClientFooter
        switchAccount={switchAccount}
        avatar={avatar}
        first_name={first_name}
        last_name={last_name}
        open={open}
        setOpen={setOpen}
        accounts={accounts}
        logout={logout}
        type={type}
      />
    )
  }

  return (
    <TrainerFooter
      switchAccount={switchAccount}
      avatar={avatar}
      first_name={first_name}
      last_name={last_name}
      open={open}
      setOpen={setOpen}
      accounts={accounts}
      logout={logout}
      type={type}
    />
  )
}

function ClientFooter({
  switchAccount,
  avatar,
  first_name,
  last_name,
  open,
  setOpen,
  accounts,
  logout,
  type
}: FooterProps) {
  const { t } = useTranslation()
  return (
    <>
      <FooterVisible>
        <UserBadgeCard
          img={avatar?.url}
          firstName={first_name}
          lastName={last_name}
          userRole={t('logged-as', { type: t(type) })}
          className="footer__user-card"
          component={<CaretRightIcon />}
          onClick={() => setOpen(!open)}
        />
      </FooterVisible>

      <FooterInvisible $open={open}>
        <div className="footer__actions-container">
          {accounts.length > 1 && (
            <Button
              size="sm"
              variant="secondary"
              className="footer__action"
              onClick={switchAccount}
            >
              {t('switch-to', {
                type: t(accounts.find((acc) => !acc.is_current)?.type || '')
              })}
            </Button>
          )}

          <a href={identity(Routes.PROFILE)}>
            <Button size="sm" variant="secondary" className="footer__action">
              Edit my information
            </Button>
          </a>

          <Button
            size="sm"
            to="#"
            variant="secondary"
            className="footer__action"
          >
            Manage payment info
          </Button>

          <Button
            variant="secondary"
            to={Routes.SETTINGS.split('/:')[0]}
            size="sm"
            className="footer__action"
          >
            LiveRight Settings
          </Button>

          <Button
            className="footer__action"
            to="#"
            size="sm"
            variant="secondary"
          >
            Get Help
          </Button>

          <div className="footer__action-divider" />

          <Button
            size="sm"
            variant="secondary"
            className="footer__action footer__action_primary"
            onClick={logout}
          >
            Log Out
          </Button>
        </div>

        <IconButton
          size="sm"
          className="footer__action-close"
          onClick={() => setOpen(false)}
        >
          <CaretLeftIcon />
        </IconButton>
      </FooterInvisible>
    </>
  )
}

function TrainerFooter({
  switchAccount,
  avatar,
  first_name,
  last_name,
  open,
  setOpen,
  accounts,
  logout,
  type
}: FooterProps) {
  const { t } = useTranslation()
  return (
    <>
      <TrainerFooterVisible>
        <UserBadgeCard
          img={avatar?.url}
          firstName={first_name}
          lastName={last_name}
          userRole={t('logged-as', { type: t(type) })}
          className="footer__user-card"
          component={<CaretRightIcon />}
          onClick={() => setOpen(!open)}
        />
      </TrainerFooterVisible>

      <TrainerFooterInvisible $open={open}>
        <div className="footer__actions-container">
          {accounts.length > 1 && (
            <Button
              size="sm"
              variant="secondary"
              className="footer__action"
              onClick={switchAccount}
            >
              <ProfileTrainerIcon />
              {t('switch-to', {
                type: t(accounts.find((acc) => !acc.is_current)?.type || '')
              })}
            </Button>
          )}

          <a href={identity(Routes.PROFILE)}>
            <Button size="sm" variant="secondary" className="footer__action">
              <ProfileCheckTrainerIcon />
              Edit my information
            </Button>
          </a>

          <Button
            size="sm"
            to="#"
            variant="secondary"
            className="footer__action"
          >
            <RevenueTrainerIcon />
            Manage payment info
          </Button>

          <Button
            variant="secondary"
            to={Routes.SETTINGS.split('/:')[0]}
            size="sm"
            className="footer__action"
          >
            <ProfileTrainerIcon />
            LiveRight Settings
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="footer__action footer__action_primary"
            onClick={logout}
          >
            <LogoutTrainerIcon />
            Log Out
          </Button>
        </div>

        {/* <IconButton
          size="sm"
          className="footer__action-close"
          onClick={() => setOpen(false)}
        >
          <CaretLeftIcon />
        </IconButton> */}
      </TrainerFooterInvisible>
    </>
  )
}
