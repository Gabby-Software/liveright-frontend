import React from 'react'

import FormRow from '../../../../components/forms/form-row/form-row.component'
import { useTrainer } from '../../../../hooks/trainer.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ProfileField from '../../components/profile-field/profile-field.component'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import Styles from './profile-addresses.styles'

type Props = {}
const ProfileAddresses = ({}: Props) => {
  const { t } = useTranslation()
  const { country, city, address, postal_code } = useTrainer()
  if (!(country || city || address || postal_code)) return null
  return (
    <Styles>
      <ProfileTitle title={'Address'} />

      <FormRow>
        <ProfileField
          type={'text'}
          name={`address`}
          label={t('profile:address')}
        />
        <FormRow>
          <ProfileField
            type={'text'}
            name={`postal_code`}
            label={t('profile:postal-code')}
          />
          <ProfileField type={'text'} name={`city`} label={t('profile:city')} />
        </FormRow>
        <ProfileField
          type={'country-select'}
          name={`country`}
          label={t('profile:country')}
        />
      </FormRow>
    </Styles>
  )
}

export default ProfileAddresses
