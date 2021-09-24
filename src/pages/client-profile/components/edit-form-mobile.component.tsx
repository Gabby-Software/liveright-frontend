import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import {
  ActionButton,
  ActionContainer,
  EditRoot,
  Preview,
  PreviewContent,
  PreviewImage,
  PreviewName,
  PreviewSub
} from '../../../components/profile-components'
import useClientAccount from '../../../hooks/api/accounts/useClientAccount'
import useImage from '../../../hooks/ui/useImage'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { noImage } from '../../../pipes/no-image.pipe'
import { OptionType } from '../../../types/option.type'
import { dataToFormValues } from '../../../utils/api/clients'
import ClientProfileCard from './client-profile-card.component'
import EditFormContent from './edit-form-content'

interface EditFormProps {
  onClose: () => any
}

export default function EditFormMobile({ onClose }: EditFormProps) {
  const { t } = useTranslation()

  const params = useParams<any>()
  const { user, account, profile, address, onUpdate, isUpdateLoading } =
    useClientAccount(params.id)
  const { src, onError } = useImage(user.avatar?.url)

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

  return (
    <MobilePage
      title={t('sessions:title')}
      headerTopComponent={
        <HeaderLink to="/clients">{t('profile:return-to-clients')}</HeaderLink>
      }
      actionComponent={
        <ActionContainer>
          <ActionButton
            onClick={() => handleSubmit(handleSave)()}
            disabled={isUpdateLoading}
          >
            {t('profile:save-changes')}
          </ActionButton>
        </ActionContainer>
      }
    >
      <EditRoot>
        <div style={{ paddingTop: '26px' }}>
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
          <EditFormContent
            address={address}
            control={control}
            genderOptions={genderOptions}
            profile={profile}
            user={user}
          />
        </div>
      </EditRoot>
    </MobilePage>
  )
}
