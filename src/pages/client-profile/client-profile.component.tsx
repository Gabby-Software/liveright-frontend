import { Skeleton } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router'

// import { Link } from 'react-router-dom'
import {
  CaretRightIcon,
  InvoiceWhiteIcon,
  UsersIcon
} from '../../assets/media/icons'
import Button from '../../components/buttons/button/button.component'
import {
  ActionButton,
  ActionContainer,
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
// import { useIsMobile } from '../../hooks/is-mobile.hook'
import useImage from '../../hooks/ui/useImage'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { date } from '../../pipes/date.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import Styles from './client-profile.styles'
import ClientProfileCard from './components/client-profile-card.component'
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
    <MobilePage
      title={t('sessions:title')}
      headerTopComponent={
        <HeaderLink to="/clients">{t('profile:return-to-clients')}</HeaderLink>
      }
      actionComponent={
        <ActionContainer>
          <ActionButton onClick={() => setEdit(true)}>
            {t('profile:edit-details')}
          </ActionButton>
        </ActionContainer>
      }
    >
      <Styles className="profile">
        <div className="profile__main">
          <ClientProfileCard>
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
          </ClientProfileCard>

          <ClientProfileCard title="Basic Info">
            <div className="profile__grid">
              <div className="profile__grid-item profile__grid-item-double profile__grid-user-names-desktop">
                <p className="profile__grid-item-name">
                  {t('profile:first-name')}
                </p>
                <p className="profile__grid-item-value">
                  {user.first_name || '-'}
                </p>
              </div>
              <div className="profile__grid-item profile__grid-item-double profile__grid-user-names-desktop">
                <p className="profile__grid-item-name">
                  {t('profile:last-name')}
                </p>
                <p className="profile__grid-item-value">
                  {user.last_name || '-'}
                </p>
              </div>
              <div className="profile__grid-user-names-mobile">
                <div className="profile__grid-item profile__grid-item-double ">
                  <p className="profile__grid-item-name">
                    {t('profile:first-name')}
                  </p>
                  <p className="profile__grid-item-value">
                    {user.first_name || '-'}
                  </p>
                </div>
                <div className="profile__grid-item profile__grid-item-double">
                  <p className="profile__grid-item-name">
                    {t('profile:last-name')}
                  </p>
                  <p className="profile__grid-item-value">
                    {user.last_name || '-'}
                  </p>
                </div>
              </div>
              <div className="profile__grid-item profile__dob-desktop">
                <p className="profile__grid-item-name">
                  {t('profile:birth-date')}
                </p>
                <p className="profile__grid-item-value">
                  {date(user.birthday) || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">{t('profile:email')}</p>
                <p className="profile__grid-item-value">{user.email || '-'}</p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">{t('profile:phone')}</p>
                <p className="profile__grid-item-value">
                  {profile.phone_number || '-'}
                </p>
              </div>
              <div className="profile__grid-item profile__dob-mobile">
                <p className="profile__grid-item-name">
                  {t('profile:birth-date')}
                </p>
                <p className="profile__grid-item-value">
                  {date(user.birthday) || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">{t('profile:gender')}</p>
                <p className="profile__grid-item-value">
                  {capitalize(user.gender) || '-'}
                </p>
              </div>
            </div>
          </ClientProfileCard>

          <ClientProfileCard title="Address">
            <div className="profile__grid">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:address')}
                </p>
                <p className="profile__grid-item-value">
                  {address.address || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:postal-code')}
                </p>
                <p className="profile__grid-item-value">
                  {address.postal_code || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">{t('profile:city')}</p>
                <p className="profile__grid-item-value">
                  {address.city || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:country')}
                </p>
                <p className="profile__grid-item-value">
                  {address.country?.name_english || '-'}
                </p>
              </div>
            </div>
          </ClientProfileCard>

          <ClientProfileCard title="Account Info">
            <div className="profile__grid">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:dietary-restrictions')}
                </p>
                <p className="profile__grid-item-value">
                  {profile.dietary_restrictions || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:injuries')}
                </p>
                <p className="profile__grid-item-value">
                  {profile.injuries || '-'}
                </p>
              </div>
            </div>
          </ClientProfileCard>

          <div className="dark-cards">
            <ClientProfileCard
              className="profile__card-dark"
              title={
                <p className="profile__card-dark-title">
                  <InvoiceWhiteIcon />
                  {t('profile:invoices')}
                </p>
              }
            >
              <p className="profile__card-dark-sub">
                {statistic.progressCount.total} {t('profile:open-invoices')}
              </p>

              <Button
                variant="text"
                size="sm"
                className="profile__card-dark-btn"
                to={Routes.INVOICES}
              >
                {t('profile:invoice-history')}
                <CaretRightIcon />
              </Button>
            </ClientProfileCard>

            <ClientProfileCard
              className="profile__card-dark"
              title={
                <p className="profile__card-dark-title">
                  <UsersIcon />
                  {t('profile:sessions')}
                </p>
              }
            >
              <p className="profile__card-dark-sub">
                {freeSessions.meta.total || 0} {t('profile:free-sessions')}
              </p>
              <p className="profile__card-dark-sub">
                {upcomingSessions.meta.total || 0}{' '}
                {t('profile:upcoming-sessions')}
              </p>
              <Button
                variant="text"
                size="sm"
                className="profile__card-dark-btn"
                to={Routes.SESSIONS + '?upcoming=1'}
              >
                Sessions list
                <CaretRightIcon />
              </Button>
            </ClientProfileCard>
          </div>
        </div>
      </Styles>
    </MobilePage>
  )
}
