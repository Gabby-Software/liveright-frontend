import React, { useContext } from 'react'

import FormRow from '../../../../components/forms/form-row/form-row.component'
import FormTextarea from '../../../../components/forms/form-textarea/form-textarea.component'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ProfileField from '../../components/profile-field/profile-field.component'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { TrainerContext } from '../../trainer.context'
import { lrClientFields, lrTrainerFields } from '../../trainer.data'
import Styles from './profile-info.styles'

const ProfileInfo = ({ title }: { title: string }) => {
  const { type } = useAuth()
  const { editMode } = useContext(TrainerContext)
  const fields = type === userTypes.CLIENT ? lrTrainerFields : lrClientFields
  const { t } = useTranslation()

  return (
    <Styles>
      <ProfileTitle title={title} />
      <FormRow>
        {fields.map((p) =>
          editMode ? (
            <FormTextarea
              name={p.name as string}
              label={t(p.label as string)}
            />
          ) : (
            <ProfileField {...p} />
          )
        )}
      </FormRow>
    </Styles>
  )
}

export default ProfileInfo
