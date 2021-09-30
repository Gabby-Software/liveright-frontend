import { PropsWithChildren } from 'react'

import { Routes } from '../../enums/routes.enum'
import useImage from '../../hooks/ui/useImage'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { date } from '../../pipes/date.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import {
  AccountObjType,
  AccountType,
  ProfileType
} from '../../types/account.type'
import { AddressType } from '../../types/address.type'
import {
  ActionButton,
  ActionContainer,
  Card,
  CardTitle,
  Preview,
  PreviewContent,
  PreviewImage,
  PreviewName
} from '.'
import Styles from './profile-body.styles'

type ProfileBodyMobileProps = {
  user: AccountObjType
  profile: ProfileType
  address: AddressType
  account: AccountType
  returnText?: string
  title: string
  actionText?: string
  setEdit: (p: boolean) => any
}

export default function ProfileBodyMobile({
  user,
  profile,
  address,
  account,
  actionText,
  returnText,
  title,
  children,
  setEdit
}: PropsWithChildren<ProfileBodyMobileProps>) {
  const { src, onError } = useImage(user?.avatar?.url)
  return (
    <MobilePage
      title={title}
      headerTopComponent={
        returnText ? (
          <HeaderLink to={Routes.HOME}>{returnText}</HeaderLink>
        ) : null
      }
      actionComponent={
        actionText ? (
          <ActionContainer>
            <ActionButton onClick={setEdit}>{actionText}</ActionButton>
          </ActionContainer>
        ) : null
      }
    >
      <Styles>
        <div className="profile__main">
          <Card
            $row
            $between
            $itemsCenter
            className="profile__header__mobile profile__card profile__card_row justify-between align-center"
          >
            <Preview className="preview__mobile">
              <PreviewImage className="previewImage__mobile">
                {src && <img src={src} alt="" onError={onError} />}
                <span>{noImage(user.first_name, user.last_name)}</span>
              </PreviewImage>
              <PreviewContent className="previewContent__mobile">
                <PreviewName className="previewName__mobile">
                  {user.first_name || ''} {user.last_name || ''}
                </PreviewName>
                {/* <PreviewSub >{capitalize(account.type)}</PreviewSub> */}
              </PreviewContent>
            </Preview>

            {!!actionText && (
              <ActionContainer>
                <ActionButton onClick={setEdit}>{actionText}</ActionButton>
              </ActionContainer>
            )}
          </Card>

          <Card>
            <CardTitle>Basic Info</CardTitle>

            <div className="profile__grid">
              <div className="profile__grid-user-names-mobile">
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
              </div>
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
                <p className="profile__grid-item-name">Date of Birth</p>
                <p className="profile__grid-item-value">
                  {date(user.birthday) || '-'}
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
            <CardTitle>Addresses</CardTitle>
            <div className="profile__grid">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">Country</p>
                <p className="profile__grid-item-value">
                  {address.country?.name_english || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">City</p>
                <p className="profile__grid-item-value">
                  {address.city || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">Postal Code</p>
                <p className="profile__grid-item-value">
                  {address.postal_code || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">Address</p>
                <p className="profile__grid-item-value">
                  {address.address || '-'}
                </p>
              </div>
            </div>
          </Card>

          {account?.type === 'trainer' ? (
            <Card>
              <CardTitle>Trainer Info</CardTitle>

              <div className="profile__grid">
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">About</p>
                  <p className="profile__grid-item-value">
                    {profile?.about || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Qualifications</p>
                  <p className="profile__grid-item-value">
                    {profile?.qualifications || '-'}
                  </p>
                </div>
                <div className="profile__grid-item">
                  <p className="profile__grid-item-name">Additional Info</p>
                  <p className="profile__grid-item-value">
                    {profile?.additional_info || '-'}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <CardTitle>Other Info</CardTitle>

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
          )}
          {children}
        </div>
      </Styles>
    </MobilePage>
  )
}
