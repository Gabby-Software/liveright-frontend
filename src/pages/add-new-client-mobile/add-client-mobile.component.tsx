import { useState } from 'react'
import { Redirect } from 'react-router-dom'

import AddClientDrawer from '../../components/clients/add-client-modal/add-client-drawer/add-client-drawer.component'
import { Routes } from '../../enums/routes.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import HeaderButton from './header-button.component'

export default function AddNewClientMobile() {
  const [step, setStep] = useState<number>(0)
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  if (!isMobile) return <Redirect to={'clients'} />
  return (
    <MobilePage
      title={t('clients:title')}
      headerTopComponent={
        step ? (
          <HeaderButton onClick={() => setStep(0)}>
            {t('clients:input-email')}
          </HeaderButton>
        ) : (
          <HeaderLink to={step ? 'add-new-client' : Routes.CLIENTS}>
            {t('profile:return-to-clients')}
          </HeaderLink>
        )
      }
    >
      <AddClientDrawer
        isOpen={true}
        width="100%"
        onSubmit={() => null}
        title=""
        onClose={() => null}
        setStep={setStep}
        step={step}
      />
    </MobilePage>
  )
}
