import React, { useContext } from 'react'

import ButtonSubmit from '../../../../components/forms/button-submit/button-submit.component'
import FormButton from '../../../../components/forms/form-button/form-button.component'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ProfileField from '../../components/profile-field/profile-field.component'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { TrainerContext } from '../../trainer.context'
import { profileBasic } from '../../trainer.data'
import Styles from './profile-basic.styles'

const ProfileBasic = ({ title }: { title: string }) => {
  const { t } = useTranslation()
  const { editMode, setEditMode } = useContext(TrainerContext)
  const { type } = useAuth()
  return (
    <Styles>
      <ProfileTitle title={title}>
        {type === userTypes.CLIENT ? null : editMode ? (
          <ButtonSubmit>{t('profile:save-changes')}</ButtonSubmit>
        ) : (
          <FormButton
            type={'primary'}
            onClick={() => {
              setEditMode(true)
            }}
          >
            {t('profile:edit-details')}
          </FormButton>
        )}
      </ProfileTitle>

      {profileBasic.map((p, index) => (
        <ProfileField key={index} {...p} />
      ))}
    </Styles>
  )
}

export default ProfileBasic
