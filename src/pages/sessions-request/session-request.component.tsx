import { useHistory } from 'react-router-dom'

import CreditsButton from '../../components/buttons/credits-button/credits-button.component'
import AddForm from '../../components/sessions/session-add-modal/component/add-form/add-form.component'
import userTypes from '../../enums/user-types.enum'
import useCreditsWithTrainer from '../../hooks/api/credits/useCreditsWithTrainer'
import { useTrainerSelector } from '../../hooks/trainer.hook'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { HeaderComponent, Styles } from './session-request.styles'

export default function SessionRequest() {
  const { t } = useTranslation()
  const trainer = useTrainerSelector()
  const history = useHistory()
  const { credits } = useCreditsWithTrainer()
  return (
    <MobilePage
      title={t('sessions:session-request-submit')}
      headerTopComponent={
        <HeaderLink to="/sessions">{t('sessions:back-to-sessions')}</HeaderLink>
      }
      headerComponent={
        <HeaderComponent>
          <CreditsButton count={credits} />
        </HeaderComponent>
      }
    >
      <Styles>
        <AddForm
          trainerId={
            trainer.accounts.find((it) => it.type === userTypes.TRAINER)!.id
          }
          onSuccess={() => history.push('/sessions')}
        />
      </Styles>
    </MobilePage>
  )
}
