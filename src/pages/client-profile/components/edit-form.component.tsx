import moment from 'moment'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import DatePicker from '../../../components/form/date-picker/date-picker.component'
import Input from '../../../components/form/input/input.component'
import Select from '../../../components/form/select/select.component'
import Textarea from '../../../components/form/textarea/textarea.component'
import {
  ActionButton,
  ActionContainer,
  Card,
  CardTitle,
  EditRoot,
  Grid,
  Preview,
  PreviewContent,
  PreviewImage,
  PreviewName,
  PreviewSub
} from '../../../components/profile-components'
import useClientAccount from '../../../hooks/api/accounts/useClientAccount'
import useImage from '../../../hooks/ui/useImage'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { noImage } from '../../../pipes/no-image.pipe'
import { dataToFormValues } from '../../../utils/api/clients'

export default function EditForm() {
  const { t } = useTranslation()

  const params = useParams<any>()
  const { user, profile, address, onUpdate, isUpdateLoading } =
    useClientAccount(params.id)
  const { src, onError } = useImage(user.avatar?.url)

  const { setValue, control, handleSubmit } = useForm()

  useEffect(() => {
    if (user.id) {
      const formValues = dataToFormValues(profile)
      Object.keys(formValues).forEach((key) => {
        setValue(key, formValues[key])
      })
    }
  }, [user.id])

  const handleSave = (values: any) => {
    onUpdate(user.uuid, values)
  }

  return (
    <EditRoot>
      <Card $row $between $itemsCenter>
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
          <ActionButton onClick={() => handleSubmit(handleSave)()}>
            {t('profile:save-changes')}
          </ActionButton>
        </ActionContainer>
      </Card>

      <Card>
        <CardTitle>Basic Info</CardTitle>

        <Grid>
          <Input
            id="profile-edit-name"
            label="First Name"
            placeholder="John"
            disabled
            defaultValue={user.first_name}
          />
          <Input
            id="profile-edit-lastname"
            label="Last Name"
            placeholder="Doe"
            disabled
            defaultValue={user.last_name}
          />
          <DatePicker
            id="profile-edit-dob"
            label="Date of Birth"
            placeholder="2000-01-01"
            disabled
            value={moment(user.birthday)}
          />
          <Input
            id="profile-edit-email"
            label="Email"
            placeholder="example@example.com"
            disabled
            defaultValue={user.email}
          />
          <Input
            id="profile-edit-phone"
            label="Phone Number"
            placeholder="+100000000"
            disabled
            defaultValue={profile.phone_number}
          />
          <Select
            id="profile-edit-gender"
            label="Gender"
            options={[]}
            disabled
            value={user.gender}
          />
        </Grid>
      </Card>

      <Card>
        <CardTitle>Address</CardTitle>

        <Grid>
          <Input
            id="profile-edit-address"
            label="Address Line 1"
            placeholder="Address"
            disabled
            defaultValue={address.address}
          />
          <Input
            id="profile-edit-address-2"
            label="Address Line 2"
            placeholder="Address"
            disabled
          />
          <div />
          <Input
            id="profile-edit-postal"
            label="Postal Code"
            placeholder="69118"
            disabled
            defaultValue={address.postal_code}
          />
          <Select
            id="profile-edit-city"
            label="City"
            options={[]}
            disabled
            value={address.city}
          />

          <Select
            id="profile-edit-country"
            label="Country"
            options={[]}
            disabled
            value={address.country?.name_english}
          />
        </Grid>
      </Card>

      <Card>
        <CardTitle>Account Info</CardTitle>

        <Grid>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Textarea
                id="profile-edit-diet"
                label="Dietary Restrictions"
                placeholder="Type restrictions here"
                value={value}
                onChange={onChange}
              />
            )}
            name="dietary_restrictions"
          />
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Textarea
                id="profile-edit-injuries"
                label="Injuries"
                placeholder="Injuries"
                value={value}
                onChange={onChange}
              />
            )}
            name="injuries"
          />
        </Grid>
      </Card>
    </EditRoot>
  )
}
