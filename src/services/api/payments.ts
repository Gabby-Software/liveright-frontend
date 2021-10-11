import {
  EP_PAYMENT_CREATE_ACCOUNT,
  EP_PAYMENT_CREATE_LINK,
  EP_PAYMENT_CREATE_STRIPE_DASHBOARD_LINK,
  EP_STRIPE_CREATE_PAYOUT
} from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function getPaymentAccount(url: string) {
  const response = await api.get(url)
  return response.data.data
}

const REFRESH_URL = window.location.href + '?sr=1'

export async function createAccount() {
  const formData = new FormData()
  formData.append('return_url', window.location.href)
  formData.append('refresh_url', REFRESH_URL)

  const response = await api.post(EP_PAYMENT_CREATE_ACCOUNT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.data
}

export async function createAccountLink() {
  const formData = new FormData()
  formData.append('return_url', window.location.href)
  formData.append('refresh_url', REFRESH_URL)

  const response = await api.post(EP_PAYMENT_CREATE_LINK, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.data
}

export async function createDashboardLink() {
  const response = await api.get(EP_PAYMENT_CREATE_STRIPE_DASHBOARD_LINK)
  return response.data.data
}

export async function getAvailableBalance(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function createPayout(
  amount: number,
  currency: string,
  description: string
) {
  const data = {
    amount,
    currency,
    description
  }
  const response = await api.post(EP_STRIPE_CREATE_PAYOUT, data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return response.data.data
}

export async function getPayoutTransactions(url: string) {
  const response = await api.get(url)
  return response.data.data
}
