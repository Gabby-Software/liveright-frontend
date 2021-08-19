import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { useAuth } from '../../../hooks/auth.hook'
import logger from '../../../managers/logger.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { ACTION_SWITCH_ACCOUNT_REQUEST } from '../../../store/action-types'
import Card from '../../card/card.style'
import ProfileAccount from '../../profile/profile-account/profile-account.component'
import { toast } from '../../toast/toast.component'
import SwitchAccountModalContext from '../switch-account-modal.context'
import Styles from './switch-account.styles'

const SwitchAccount = () => {
  const { onClose } = useContext(SwitchAccountModalContext)
  const { first_name, last_name, avatar, accounts } = useAuth()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const switchAccount = (uuid: string) => {
    logger.info('SWITCH_ACCOUNT', 1, uuid)
    dispatch({
      type: ACTION_SWITCH_ACCOUNT_REQUEST,
      payload: {
        uuid,
        onSuccess: () => {
          onClose()
          toast.show({
            type: 'success',
            msg: t('alerts:switch-account-success')
          })
        }
      }
    })
  }
  return (
    <Styles>
      {accounts.map(({ uuid, type, is_current }, i) => (
        <Card
          className={'swa-card'}
          onClick={() => !is_current && switchAccount(uuid)}
          key={i}
        >
          <ProfileAccount
            first_name={first_name}
            last_name={last_name}
            type={type}
            image={avatar?.url || ''}
            active={is_current}
          />
        </Card>
      ))}
      {/*<Card className={'swa-card__add'} onClick={() => setState(AccountActions.ADD_ACCOUNT)}>*/}
      {/*    <span>{t('menu.add-account')}</span>*/}
      {/*</Card>*/}
    </Styles>
  )
}

export default SwitchAccount
