import { components } from 'react-select'

import useClients from '../../../hooks/api/clients/useClients'
import { dataToOptions } from '../../../utils/api/clients'
import UserBadge from '../../user-badge/user-badge.component'
import Select, { SelectProps } from '../select/select.component'

let IS_LOADING = false
let HAS_MORE = false

interface ClientSelectProps extends Partial<SelectProps> {
  includeAll?: boolean
  onChange: (e: any, option: any) => void
}

export default function ClientSelect({
  includeAll = true,
  ...props
}: ClientSelectProps) {
  const { clients, loadMore, isLoading, hasMore, onSearch } = useClients()
  const options = dataToOptions(clients, includeAll)
  IS_LOADING = isLoading
  HAS_MORE = hasMore

  const handleBottom = () => {
    if (!IS_LOADING && HAS_MORE) {
      loadMore()
    }
  }

  return (
    <Select
      id="client-select"
      options={options}
      onSearch={onSearch}
      onBottom={handleBottom}
      Components={{ Option }}
      loading={isLoading}
      {...props}
    />
  )
}

function Option(props: any) {
  if (props.data.value === 'all') {
    return <components.Option {...props} />
  }
  return (
    <components.Option {...props}>
      <UserBadge
        avatar={props.data.avatar}
        firstName={props.data.firstName}
        lastName={props.data.lastName}
        square
      />
    </components.Option>
  )
}
