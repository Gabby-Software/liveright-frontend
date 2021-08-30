import { EP_CHECK_EMAIL_EXIST, EP_INVITE_NEW_USER } from '../enums/api.enum'
import { identity } from '../pipes/identity.pipe'
import { InvitationFormType } from '../types/invitation-form.type'
import api from './api.manager'

export default class InvitationManager {
  public static checkEmailExist(email: string) {
    return api
      .get(`${EP_CHECK_EMAIL_EXIST}?email=${encodeURIComponent(email)}`)
      .then((res) => res.data?.data)
  }

  public static sendInvitationExistingUser(
    email: string,
    message: string,
    type: 'training' | 'organizational'
  ) {
    return api
      .post(
        EP_INVITE_NEW_USER,
        { email, message, type },
        {
          headers: {
            origin: identity(''),
            'custom-origin': identity('')
          }
        }
      )
      .then((res) => res.data.data)
  }

  public static sendInvitationNewUser(invitationData: InvitationFormType) {
    return api
      .post(EP_INVITE_NEW_USER, invitationData, {
        headers: {
          origin: identity(''),
          'custom-origin': identity('')
        }
      })
      .then((res) => res.data.data)
  }

  public static acceptInvitation(
    id: string,
    expires: string,
    signature: string
  ) {
    const params = new URLSearchParams({ expires, signature }).toString()
    return api
      .get(`${EP_INVITE_NEW_USER}/${id}/accept?${params}`)
      .then((res) => res.data)
  }

  public static rejectInvitation(
    id: string,
    expires: string,
    signature: string
  ) {
    const params = new URLSearchParams({ expires, signature }).toString()
    return api
      .get(`${EP_INVITE_NEW_USER}/${id}/reject?${params}`)
      .then((res) => res.data)
  }
}
