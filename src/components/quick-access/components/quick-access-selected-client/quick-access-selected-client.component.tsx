import { FC } from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import { useQuickAccess } from '../../quick-access.context'
import { CloseBtn, Styles } from './quick-access-selected-client.styles'

type Props = {}

const QuickAccessSelectedClient: FC<Props> = ({}) => {
  const { client, setClient } = useQuickAccess()

  return (
    <Styles
      circle
      img={client?.avatar?.url}
      firstName={client?.first_name || ''}
      lastName={client?.last_name || ''}
      userRole={client?.email || ''}
      component={
        <CloseBtn size="sm" onClick={() => setClient(null)}>
          <CrossIcon />
        </CloseBtn>
      }
    />
  )
}

export default QuickAccessSelectedClient
