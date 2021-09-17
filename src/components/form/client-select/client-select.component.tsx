import { useCallback } from 'react'

import useClients from '../../../hooks/api/clients/useClients'
import { dataToOptions } from '../../../utils/api/clients'
import Select, { SelectProps } from '../select/select.component'
import { Option } from '../select/select.options'

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

  const handleBottom = useCallback(() => {
    if (!IS_LOADING && HAS_MORE) {
      loadMore()
    }
  }, [])

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
