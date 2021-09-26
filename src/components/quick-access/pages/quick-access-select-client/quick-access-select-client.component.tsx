import React, { FC, useCallback, useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../../assets/media/icons/search.svg'
import { EP_GET_CLIENTS } from '../../../../enums/api.enum'
import api from '../../../../managers/api.manager'
import { excerpt } from '../../../../pipes/excerpt.pipe'
import { noImage } from '../../../../pipes/no-image.pipe'
import { throttle } from '../../../../pipes/throttle.pipe'
import { AccountObjType } from '../../../../types/account.type'
import Card from '../../../card/card.style'
import FormButton from '../../../forms/form-button/form-button.component'
import { FormInputUI } from '../../../forms/form-input/form-input.component'
import ProfileImage from '../../../profile-image/profile-image.component'
import { useQuickAccess } from '../../quick-access.context'
import Styles from './quick-access-select-client.styles'

type Props = {}
const QuickAccessSelectClient: FC<Props> = ({}) => {
  const { setClient } = useQuickAccess()
  const [clients, setClients] = useState<AccountObjType[]>([])
  const [input, setInput] = useState('')
  const getClients = throttle<[string]>((value: string) => {
    api
      .get(EP_GET_CLIENTS + `?status=active&query=${value}`)
      .then((res) => res.data.data)
      .then((res) => {
        setClients(res.slice(0, 4))
      })
  }, 500)
  const handleUpdate = useCallback((val: string) => {
    setInput(val)
    if (!val) {
      setClients([])
    } else {
      getClients.next(val)
    }
  }, [])
  return (
    <Styles>
      <FormInputUI
        name={'search'}
        icon={<SearchIcon />}
        value={input}
        label={'Search client to log to'}
        onUpdate={handleUpdate}
      />
      <div className={'qa-search__clients'}>
        {clients.map((client: AccountObjType) => (
          <Card className={'qa-search__client'} key={client.id}>
            <ProfileImage
              url={client.avatar?.url}
              placeholder={noImage(client.first_name, client.last_name)}
            />
            <div className={'qa-search__client__data'}>
              <div className={'qa-search__client__name'}>
                {excerpt(`${client.first_name} ${client.last_name}`, 20)}
              </div>
              <div className={'qa-search__client__email'}>
                {excerpt(client.email, 28)}
              </div>
            </div>
            <FormButton
              type={'text'}
              className={'qa-search__client__action'}
              onClick={() => setClient(client)}
            >
              Log
            </FormButton>
          </Card>
        ))}
      </div>
    </Styles>
  )
}

export default QuickAccessSelectClient
