import React from 'react'

import { useTranslation } from '../../../modules/i18n/i18n.hook'
// import AddSessionMobile from '../../../pages/sessions/sections/add-session/add-session-mobile/add-session-mobile.component'
import BottomButton from '../../bottom-button/bottom-button.component'

const MobileSessionFooter = () => {
  const { t } = useTranslation()
  // const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      <BottomButton
        type={'primary'}
        className={'sessions-footer__add'}
        // onClick={() => setIsFormOpen(true)}
      >
        {t('sessions:add')}
      </BottomButton>
      {/*<AddSessionMobile*/}
      {/*  isOpen={isFormOpen}*/}
      {/*  onClose={() => setIsFormOpen(false)}*/}
      {/*/>*/}
      {/*<SessionAddModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}/>*/}
    </>
  )
}

export default MobileSessionFooter
