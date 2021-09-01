import React from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import UserBadgeCard from '../../../../components/cards/user-bardge-card/user-badge-card.component'
import { AccountObjType } from '../../../../types/account.type'
import Styles from './create-invoice-client-card.styles'

type Props = {
  client: AccountObjType
  onRemove: () => void
}

const CreateInvoiceClientCard = ({ client, onRemove }: Props) => {
  return (
    <Styles>
      <UserBadgeCard
        img={client?.avatar?.url}
        firstName={client?.first_name}
        lastName={client?.last_name}
        userRole={client?.email}
        className="ci-cc__user-card"
        component={
          <IconButton className="ci-cc__btn" onClick={onRemove}>
            <CrossIcon />
          </IconButton>
        }
      />
    </Styles>
  )
}

export default CreateInvoiceClientCard
