import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useClients } from '../../../hooks/clients.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { ACTION_GET_CLIENTS_REQUEST } from '../../../store/action-types'
import BottomButton from '../../bottom-button/bottom-button.component'
import AddClientModal from '../add-client-modal/add-client-modal.component'

const MobileClientFooter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const { filters } = useClients()
  const dispatch = useDispatch()
  const refetchClients = () => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        ...filters,
        page: 1
      }
    })
  }
  useEffect(() => {
    const params = new URLSearchParams(document.location.search)
    const add = params.get('add')
    if (add) {
      setIsOpen(true)
    }
  }, [])
  return (
    <>
      <BottomButton type={'primary'} onClick={() => setIsOpen(true)}>
        {t('clients:add')}
      </BottomButton>
      <AddClientModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={refetchClients}
      />
    </>
  )
}

export default MobileClientFooter
