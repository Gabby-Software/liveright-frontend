import { Skeleton } from 'antd'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import {
  CaretRightIcon,
  InvoiceWhiteIcon,
  UsersIcon
} from '../../assets/media/icons'
import Button from '../../components/buttons/button/button.component'
import Card from '../../components/cards/card/card.component'
import { toast } from '../../components/toast/toast.component'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import useClientAccount from '../../hooks/api/accounts/useClientAccount'
import { handleError } from '../../managers/api.manager'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { date } from '../../pipes/date.pipe'
import { ACTION_UPDATE_CLIENT_REQUEST } from '../../store/action-types'
import { AccountType } from '../../types/account.type'
import Styles from './client-profile.styles'

export default function ClientProfile() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const params = useParams<any>()
  const { isLoading, error, user, profile, address } = useClientAccount(
    params.id
  )

  const [img, setImg] = useState('')

  useEffect(() => {
    if (user.avatar?.url) {
      setImg(user.avatar?.url)
    }
  }, [user.avatar?.url])

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
        },
        onError: handleError(helper)
      }
    })
  }

  if (isLoading || error) {
    return <Skeleton />
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={{}}>
      <Form>
        <Styles className="profile">
          <div className="profile__main">
            <Card className="profile__card profile__card_row justify-between align-center">
              <div className="profile__preview">
                <div className="profile__preview-img">
                  {img && <img src={img} alt="" onError={() => setImg('')} />}
                  <span>
                    {user.first_name?.[0] || ''}
                    {user.last_name?.[0] || ''}
                  </span>
                </div>

                <div>
                  <p className="profile__preview-name">
                    {user.first_name || ''} {user.last_name || ''}
                  </p>
                  <p className="profile__preview-sub">Client</p>
                </div>
              </div>

              <div className="profile__action">
                <Button disabled>{t('profile:edit-details')}</Button>
              </div>
            </Card>

            <Card className="profile__card">
              <h3 className="profile__card-title">Basic Info</h3>

              <div className="profile__grid">
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">First Name</p>
                  <p className="profile__grid-item-value">
                    {user.first_name || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Last Name</p>
                  <p className="profile__grid-item-value">
                    {user.last_name || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Date of Birth</p>
                  <p className="profile__grid-item-value">
                    {date(user.birthday) || '-'}
                  </p>
                </div>
                <div className="profile__grid-item" />
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Email</p>
                  <p className="profile__grid-item-value">
                    {user.email || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Phone Number</p>
                  <p className="profile__grid-item-value">
                    {profile.phone_number || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Gender</p>
                  <p className="profile__grid-item-value">
                    {capitalize(user.gender) || '-'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="profile__card">
              <h3 className="profile__card-title">Address</h3>

              <div className="profile__grid">
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Address</p>
                  <p className="profile__grid-item-value">
                    {address.address || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Postal Code</p>
                  <p className="profile__grid-item-value">
                    {address.postal_code || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">City</p>
                  <p className="profile__grid-item-value">
                    {address.city || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Country</p>
                  <p className="profile__grid-item-value">
                    {address.country?.name_english || '-'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="profile__card">
              <h3 className="profile__card-title">Account Info</h3>

              <div className="profile__grid">
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">
                    Dietary Restrictions
                  </p>
                  <p className="profile__grid-item-value">
                    {profile.dietary_restrictions || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Injuries</p>
                  <p className="profile__grid-item-value">
                    {profile.injuries || '-'}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex">
              <Card className="profile__card-dark">
                <p className="profile__card-dark-title">
                  <InvoiceWhiteIcon />
                  Invoices
                </p>
                <p className="profile__card-dark-sub">0 Open Invoices</p>

                <Button
                  variant="text"
                  size="sm"
                  className="profile__card-dark-btn"
                  to={Routes.INVOICES}
                >
                  Invoice History
                  <CaretRightIcon />
                </Button>
              </Card>

              <Card className="profile__card-dark">
                <p className="profile__card-dark-title">
                  <UsersIcon />
                  Sessions
                </p>
                <p className="profile__card-dark-sub">0 Free Sessions</p>
                <p className="profile__card-dark-sub">0 Upcoming Session</p>
              </Card>
            </div>
          </div>
        </Styles>
      </Form>
    </Formik>
  )
}
