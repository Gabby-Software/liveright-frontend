import { EP_GET_CLIENTS } from '../../../enums/api.enum'
import { getClients } from '../../../services/api/clients'
import { AccountObjType } from '../../../types/account.type'
import { formatClients } from '../../../utils/api/clients'
import useSwrInfinite, { UseSwrInfinite } from '../../swr/useSwrInfinite'
import useSearch, { UseSearch } from '../../ui/useSearch'

interface UseClients {
  isLoading: boolean
  clients: AccountObjType[]
}

export default function useClients(): UseClients &
  Pick<UseSwrInfinite<AccountObjType>, 'loadMore' | 'hasMore'> &
  Pick<UseSearch, 'onSearch'> {
  const { search, onSearch } = useSearch()
  const params = {
    per_page: 10,
    query: search,
    status: 'active'
  }

  const { data, isLoading, loadMore, hasMore } = useSwrInfinite<AccountObjType>(
    EP_GET_CLIENTS,
    params,
    getClients
  )

  return {
    isLoading,
    clients: formatClients(data),
    loadMore,
    hasMore,
    onSearch
  }
}
