import React, { FC } from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import { excerpt } from '../../../../pipes/excerpt.pipe'
import { noImage } from '../../../../pipes/no-image.pipe'
import ProfileImage from '../../../profile-image/profile-image.component'
import { useQuickAccess } from '../../quick-access.context'
import Styles from './quick-access-selected-client.styles'

type Props = {}
const QuickAccessSelectedClient: FC<Props> = ({}) => {
  const { client, setClient } = useQuickAccess()
  return (
    <Styles>
      <ProfileImage
        url={client?.avatar?.url}
        placeholder={noImage(client?.first_name, client?.last_name)}
      />
      <div className={'qa-client__data'}>
        <div className={'qa-client__name'}>
          {excerpt(`${client?.first_name} ${client?.last_name}`, 20)}
        </div>
        <div className={'qa-client__email'}>{excerpt(client?.email, 28)}</div>
      </div>
      <CrossIcon
        className={'qa-client__action'}
        onClick={() => setClient(null)}
      />
    </Styles>
  )
}

export default QuickAccessSelectedClient
