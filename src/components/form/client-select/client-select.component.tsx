import { components } from 'react-select'

import useClients from '../../../hooks/api/clients/useClients'
import { dataToOptions } from '../../../utils/api/clients'
import Select, { SelectProps } from '../select/select.component'

interface ClientSelectProps extends Partial<SelectProps> {
  includeAll?: boolean
}

export default function ClientSelect({
  includeAll = true,
  ...props
}: ClientSelectProps) {
  const { clients, loadMore, isLoading, hasMore, onSearch } = useClients()
  const options = dataToOptions(clients, includeAll)

  const handleBottom = () => {
    if (!isLoading && hasMore && loadMore) {
      loadMore()
    }
  }

  return (
    <Select
      id="client-select"
      options={options}
      onSearch={onSearch}
      onBottom={handleBottom}
      Components={{ Menu }}
      {...props}
    />
  )
}

function Menu(props: any) {
  const key = props.options && props.options.length
  return <components.Menu {...props} key={`search-user-menu-${key}`} />
}
