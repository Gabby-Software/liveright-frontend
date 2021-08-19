import { Skeleton } from 'antd'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { toast } from '../../components/toast/toast.component'
import userTypes from '../../enums/user-types.enum'
import { useClient } from '../../hooks/client.hook'
import { useTitle } from '../../hooks/title.hook'
import { handleError } from '../../managers/api.manager'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { ACTION_UPDATE_CLIENT_REQUEST } from '../../store/action-types'
import { AccountType } from '../../types/account.type'
import ProfileAddresses from '../trainer/sections/profile-addresses/profile-addresses.component'
import ProfileBasic from '../trainer/sections/profile-basic/profile-basic.component'
import ProfileImage from '../trainer/sections/profile-image/profile-image.component'
import ProfileInfo from '../trainer/sections/profile-info/profile-info.component'
import SessionsInvoices from '../trainer/sections/sessions-invoices/sessions-invoices.component'
import { TrainerContext } from '../trainer/trainer.context'
import { ClientProfileProvider } from './client.context'
import Styles from './client-profile.styles'

type Props = {}
const ClientProfileContent = ({}: Props) => {
  const { loading, error, data, setEditMode } = useContext(TrainerContext)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { data: client } = useClient()
  useTitle(`Viewing ${client?.first_name || ''} ${client?.last_name || ''}`)
  const handleSubmit = (values: any, helper: FormikHelpers<any>) => {
    dispatch({
      type: ACTION_UPDATE_CLIENT_REQUEST,
      payload: {
        ...values,
        client_uuid: values.accounts.find(
          (acc: AccountType) => acc.type === userTypes.CLIENT
        )?.uuid,
        onSuccess: () => {
          helper.setSubmitting(false)
          toast.show({
            type: 'success',
            msg: t('alerts:client-update-success')
          })
          setEditMode(false)
        },
        onError: handleError(helper)
      }
    })
  }

  if (loading) return <Skeleton />
  if (error) return <p>{error}</p>

  return (
    <Formik onSubmit={handleSubmit} initialValues={data || {}}>
      <Form>
        <Styles className={'profile'}>
          {/*<ProfileSidebar/>*/}
          <div className={'profile__main'}>
            <ProfileImage />
            <ProfileBasic title={`${data?.first_name}'s Profile`} />
            <ProfileAddresses />
            <ProfileInfo title={'Client Info'} />
            <SessionsInvoices />
          </div>
        </Styles>
      </Form>
    </Formik>
  )
}
const ClientProfile = () => (
  <ClientProfileProvider>
    <ClientProfileContent />
  </ClientProfileProvider>
)
export default ClientProfile
