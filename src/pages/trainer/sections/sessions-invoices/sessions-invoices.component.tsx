import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as InvoicesIcon } from '../../../../assets/media/icons/invoices.svg'
import { ReactComponent as SessionsIcon } from '../../../../assets/media/icons/sessions.svg'
import Card from '../../../../components/card/card.style'
import { Routes } from '../../../../enums/routes.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Styles from './sessions-invoices.styles'

type Props = {}

const SessionsInvoices = ({}: Props) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <Link to={Routes.INVOICES}>
        <Card className={'stats__item'}>
          <div className={'stats__head'}>
            <InvoicesIcon />
            <span>{t('menu.invoices')}</span>
          </div>
          <div className={'stats__desc'}>
            {t('profile:open-invoices', { x: 0 })}
          </div>
          <div className={'stats__desc'}>{t('profile:invoice-history')}</div>
        </Card>
      </Link>
      <Link to={Routes.SESSIONS}>
        <Card className={'stats__item'}>
          <div className={'stats__head'}>
            <SessionsIcon />
            <span>{t('menu.sessions')}</span>
          </div>
          <div className={'stats__desc'}>
            {t('profile:free-sessions', { x: 0 })}
          </div>
          <div className={'stats__desc'}>
            {t('profile:upcoming-sessions', { x: 0 })}
          </div>
        </Card>
      </Link>
    </Styles>
  )
}

export default SessionsInvoices
