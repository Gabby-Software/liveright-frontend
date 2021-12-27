import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import {
  ActionButton,
  ActionContainer,
  Card,
  Preview,
  PreviewContent,
  PreviewImage,
  PreviewName,
  PreviewSub
} from '../../../components/profile-components'
import useClientAccount from '../../../hooks/api/accounts/useClientAccount'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import useImage from '../../../hooks/ui/useImage'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { noImage } from '../../../pipes/no-image.pipe'
import { OptionType } from '../../../types/option.type'
import { dataToFormValues } from '../../../utils/api/clients'
import Styles from '../client-profile.styles'
import EditFormContent from './edit-form-content'
import EditFormMobile from './edit-form-mobile.component'

interface EditFormProps {
  onClose: () => any
}

export default function EditForm({ onClose }: EditFormProps) {
  const { t } = useTranslation()

  const params = useParams<any>()
  const { user, account, profile, address, onUpdate, isUpdateLoading } =
    useClientAccount(params.clientId)
  const { src, onError } = useImage(user.avatar?.url)
  const isMobile = useIsMobile()

  const { setValue, control, handleSubmit } = useForm()

  useEffect(() => {
    if (account.id) {
      const formValues = dataToFormValues(profile)
      Object.keys(formValues).forEach((key) => {
        setValue(key, formValues[key])
      })
    }
  }, [account.id])

  const handleSave = (values: any) => {
    onUpdate(account.uuid, values, onClose)
  }

  const genderOptions: OptionType[] = [
    {
      label: t('profile:male') as string,
      value: 'male'
    },
    {
      label: t('profile:female') as string,
      value: 'female'
    }
  ]

  if (isMobile) return <EditFormMobile onClose={onClose} />

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
            <ActionButton
              onClick={() => handleSubmit(handleSave)()}
              disabled={isUpdateLoading}
            >
              {t('profile:save-changes')}
            </ActionButton>
          </ActionContainer>
        </Card>

        <EditFormContent
          address={address}
          control={control}
          genderOptions={genderOptions}
          profile={profile}
          user={user}
        />
      </div>
    </Styles>
  )
}
