import { parse } from 'query-string'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'

import CurrentDateCard from '../../components/cards/current-date-card/current-date-card.component'
import Form from '../../components/sessions/session-reschedule-modal/components/form/form.components'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { SessionType } from '../../types/session.type'
import Styles from './session-reschedule.styles'

export default function SessionReschedule() {
  const { t } = useTranslation()
  const { search } = useLocation()
  const query = parse(search)
  const [session, setSession] = useState<SessionType>()
  const history = useHistory()

  useEffect(() => {
    if (query.session) {
      const session: SessionType = JSON.parse(query.session as string)
      if (session.id) {
        setSession(session)
      }
    }
  }, [query.session])

  return (
    <MobilePage
      title={t('sessions:reschedule-session')}
      headerTopComponent={
        <HeaderLink to="/sessions">{t('sessions:back-to-sessions')}</HeaderLink>
      }
      headerSpacing={25}
    >
      <Styles className="reschedule-session">
        {session?.starts_at && (
          <CurrentDateCard
            date={session.starts_at}
            className="reschedule-session__date-card"
          />
        )}

        {session && (
          <Form session={session} onSuccess={() => history.push('/sessions')} />
        )}
      </Styles>
    </MobilePage>
  )
}
