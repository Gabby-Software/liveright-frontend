import moment from 'moment'
import { Controller } from 'react-hook-form'

import DatePicker from '../../../components/form/date-picker/date-picker.component'
import Input from '../../../components/form/input/input.component'
import Select from '../../../components/form/select/select.component'
import Textarea from '../../../components/form/textarea/textarea.component'
import { FormSwitchUI } from '../../../components/forms/form-switch/form-switch.component'
import { Card, CardTitle, Grid } from '../../../components/profile-components'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { AccountObjType, ProfileType } from '../../../types/account.type'
import { AddressType } from '../../../types/address.type'
import { OptionType } from '../../../types/option.type'

type EditFormContentProps = {
  user: AccountObjType
  address: AddressType
  profile: ProfileType
  genderOptions: OptionType[]
  control: any
}

export default function EditFormContent({
  user,
  address,
  profile,
  genderOptions,
  control
}: EditFormContentProps) {
  const { t } = useTranslation()
  return (
    <>
      <Card>
        <CardTitle>Basic Info</CardTitle>
        <Grid>
          <Input
            id="profile-edit-name"
            label="First Name"
            placeholder="John"
            disabled
            defaultValue={user.first_name}
            className="edit__grid-item-double edit__grid-user-names-desktop"
          />
          <Input
            id="profile-edit-lastname"
            label="Last Name"
            placeholder="Doe"
            disabled
            defaultValue={user.last_name}
            className="edit__grid-item-double edit__grid-user-names-desktop"
          />
          <div className="edit__grid-user-names-mobile">
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
          </div>
          <DatePicker
            id="profile-edit-dob"
            label="Date of Birth"
            placeholder="2000-01-01"
            disabled
            value={moment(user.birthday)}
            className="edit__grid-item edit__dob-desktop"
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
          <DatePicker
            id="profile-edit-dob"
            label={t('profile:birth-date')}
            placeholder="2000-01-01"
            disabled
            value={moment(user.birthday)}
            className="edit__grid-item edit__dob-mobile"
          />
          {/* {isMobile ? ( */}
          <div className="edit__gender-mobile">
            <FormSwitchUI value={t('male')} options={genderOptions} />
          </div>
          {/* ) : ( */}
          <Select
            id="profile-edit-gender"
            label={t('profile:gender')}
            // options={[]}
            options={genderOptions}
            disabled
            value={user.gender}
            className="edit__gender-desktop"
          />
          {/* // )} */}
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
    </>
  )
}
