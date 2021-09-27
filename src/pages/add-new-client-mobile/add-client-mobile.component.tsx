import { useState } from 'react'

import AddClientDrawer from '../../components/clients/add-client-modal/add-client-drawer/add-client-drawer.component'
import AddClientForms from '../../components/clients/add-client-modal/add-client-forms.component'
import AddClientModal from '../../components/clients/add-client-modal/add-client-modal.component'
import {
  ActionButton,
  ActionContainer
} from '../../components/profile-components'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'

export default function AddNewClientMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return (
    <MobilePage
      title={t('sessions:title')}
      headerTopComponent={
        <HeaderLink to="/clients">{t('profile:return-to-clients')}</HeaderLink>
      }
      //   actionComponent={
      //     <ActionContainer>
      //       <ActionButton onClick={() => setEdit(true)}>
      //         {t('profile:edit-details')}
      //       </ActionButton>
      //     </ActionContainer>
      //   }
    >
      <AddClientDrawer
        isOpen={true}
        width="100%"
        onSubmit={() => null}
        title=""
        onClose={() => null}
      />
    </MobilePage>
  )
}
