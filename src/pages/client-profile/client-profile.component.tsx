import { Skeleton } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import {
  CaretRightIcon,
  InvoiceWhiteIcon,
  UsersIcon
} from '../../assets/media/icons'
import Button from '../../components/buttons/button/button.component'
import {
  ActionButton,
  ActionContainer,
  Card,
  CardTitle,
  Preview,
  PreviewContent,
  PreviewImage,
  PreviewName,
  PreviewSub
} from '../../components/profile-components'
import { Routes } from '../../enums/routes.enum'
import useClientAccount from '../../hooks/api/accounts/useClientAccount'
import useSessions, {
  UseSessionsConfig
} from '../../hooks/api/sessions/useSessions'
import useStatistic from '../../hooks/api/stat/useStatistic'
import useImage from '../../hooks/ui/useImage'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { date } from '../../pipes/date.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import Styles from './client-profile.styles'
import EditForm from './components/edit-form.component'

function getSessionsConfig(id: number, free?: boolean): UseSessionsConfig {
  return {
    filter: {
      client_id: id,
      status: 'upcoming',
      ...(free && { type: 'Complimentary' })
    }
  } as UseSessionsConfig
}

export default function ClientProfile() {
  const { t } = useTranslation()
  const params = useParams<any>()
  const [edit, setEdit] = useState(false)
  const { isLoading, error, user, profile, address } = useClientAccount(
    params.id
  )
  const statistic = useStatistic({ account_id: params.id })
  const upcomingSessions = useSessions(getSessionsConfig(params.id))
  const freeSessions = useSessions(getSessionsConfig(params.id, true))

  const { src, onError } = useImage(user.avatar?.url)

  if (isLoading || error) {
    return <Skeleton />
  }

  if (edit) {
    return <EditForm onClose={() => setEdit(false)} />
  }

  return (
    <Styles className="profile">
      <div className="profile__main">
        <Card
          $row
          $between
          $itemsCenter
          className="profile__card profile__card_row justify-between align-center"
        >
          <Preview>
            <PreviewImage>
              {src && <img src={src} alt="" onError={onError} />}
              <span>{noImage(user.first_name, user.last_name)}</span>
            </PreviewImage>
            <PreviewContent>
              <PreviewName>
                {user.first_name || ''} {user.last_name || ''}
              </PreviewName>
              <PreviewSub>Client</PreviewSub>
            </PreviewContent>
          </Preview>

          <ActionContainer>
            <ActionButton onClick={() => setEdit(true)}>
              {t('profile:edit-details')}
            </ActionButton>
          </ActionContainer>
        </Card>

        <Card>
          <CardTitle>Basic Info</CardTitle>

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
              <p className="profile__grid-item-value">{user.email || '-'}</p>
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

        <Card>
          <CardTitle>Address</CardTitle>

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
              <p className="profile__grid-item-value">{address.city || '-'}</p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Country</p>
              <p className="profile__grid-item-value">
                {address.country?.name_english || '-'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Account Info</CardTitle>

          <div className="profile__grid">
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Dietary Restrictions</p>
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
            <p className="profile__card-dark-sub">
              {statistic.progressCount.total} Open Invoices
            </p>

            <Button
              variant="text"
              size="sm"
              className="profile__card-dark-btn"
              to={Routes.FINANCIALS_RECEIVABLES}
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
            <p className="profile__card-dark-sub">
              {freeSessions.meta.total || 0} Free Sessions
            </p>

            <Link to={Routes.SESSIONS + '?upcoming=1'}>
              <p className="profile__card-dark-sub">
                {upcomingSessions.meta.total || 0} Upcoming Session
              </p>
            </Link>
          </Card>
        </div>
      </div>
    </Styles>
  )
}
