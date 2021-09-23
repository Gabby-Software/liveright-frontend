import { EP_PAYMENT_CREATE_ACCOUNT } from '../../enums/api.enum'
import { Routes } from '../../enums/routes.enum'
import api from '../../managers/api.manager'

export async function getPaymentAccount(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function createAccount() {
  const response = await api.post(EP_PAYMENT_CREATE_ACCOUNT, {
    return_rul: Routes.FINANCIALS_RECEIVABLES,
    refresh_url: Routes.FINANCIALS_RECEIVABLES
  })
  return response.data
}
