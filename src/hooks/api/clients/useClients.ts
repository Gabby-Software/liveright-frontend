import useSWR from 'swr'

import { EP_GET_CLIENTS } from '../../../enums/api.enum'
import { getClients } from '../../../services/api/clients'
import { AccountObjType } from '../../../types/account.type'

interface UseClients {
  isLoading: boolean
  clients: AccountObjType[]
}

export default function useClients(): UseClients {
  const { data, error } = useSWR(EP_GET_CLIENTS, getClients)
  const isLoading = !data && !error
  const clients = data || []
  return {
    isLoading,
    clients
  }
}
