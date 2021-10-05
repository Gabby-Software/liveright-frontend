import { PropsWithChildren } from 'react'

import { useIsMobile } from '../../hooks/is-mobile.hook'
import useImage from '../../hooks/ui/useImage'
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
  PreviewName,
  PreviewSub
} from '.'
import Styles from './profile-body.styles'
import ProfileBodyMobile from './profile-body-mobile.component'

type ProfileBodyProps = {
  user: AccountObjType
  profile: ProfileType
  address: AddressType
  account: AccountType
  actionText?: string
  mobileTitle: string
  mobileReturnText?: string
  setEdit: (p: boolean) => any
}

export default function ProfileBody({
  user,
  profile,
  address,
  account,
  actionText,
  mobileTitle,
  mobileReturnText,
  children,
  setEdit
}: PropsWithChildren<ProfileBodyProps>) {
  const { src, onError } = useImage(user?.avatar?.url)
  const isMobile = useIsMobile()
  if (isMobile) {
    return (
      <ProfileBodyMobile
        user={user}
        profile={profile}
        address={address}
        account={account}
        setEdit={setEdit}
        title={mobileTitle}
        actionText={actionText}
        returnText={mobileReturnText}
      >
        {children}
      </ProfileBodyMobile>
    )
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
              <PreviewSub>{capitalize(account.type)}</PreviewSub>
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

        {account?.type === 'trainer' ? (
          <Card>
            <CardTitle>Other Info</CardTitle>

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
        )}
        {children}
      </div>
    </Styles>
  )
}
