import {
  EP_PAYMENT_CREATE_ACCOUNT,
  EP_PAYMENT_CREATE_LINK
} from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function getPaymentAccount(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function createAccount() {
  const formData = new FormData()
  formData.append('return_url', window.location.href)
  formData.append('refresh_url', window.location.href)

  const response = await api.post(EP_PAYMENT_CREATE_ACCOUNT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.data
}

export async function createAccountLink() {
  const formData = new FormData()
  formData.append('return_url', window.location.href)
  formData.append('refresh_url', window.location.href)

  const response = await api.post(EP_PAYMENT_CREATE_LINK, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}
