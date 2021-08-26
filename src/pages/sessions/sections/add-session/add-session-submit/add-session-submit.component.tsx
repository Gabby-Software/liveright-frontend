import { useFormikContext } from 'formik'
import React from 'react'

import BusyBadge from '../../../../../components/busy-badge/busy-badge.component'
import Button from '../../../../../components/buttons/button/button.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'

interface Props {
  session?: SessionType
}

const AddSessionSubmit: React.FC<Props> = (props) => {
  const { session } = props
  const { t } = useTranslation()
  const { values, isSubmitting, submitForm } =
    useFormikContext<AddSessionFormType>()
  const { isBusy } = values

  return (
    <React.Fragment>
      {isBusy && <BusyBadge className="add-session__busy" />}
      <Button
        className="add-session__submit-btn"
        type="submit"
        disabled={isSubmitting}
        onClick={submitForm}
      >
        {session
          ? t('sessions:save')
          : isBusy
          ? t('sessions:submit-anyway')
          : t('sessions:submit')}
      </Button>
    </React.Fragment>
  )
}

export default AddSessionSubmit
