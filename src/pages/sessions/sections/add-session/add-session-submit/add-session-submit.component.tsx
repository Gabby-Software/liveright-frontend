import { useFormikContext } from 'formik'
import React from 'react'

import Button from '../../../../../components/buttons/button/button.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import Styles from './add-session-submit.styles'

interface Props {
  session?: SessionType
}

const AddSessionSubmit: React.FC<Props> = (props) => {
  const { session } = props
  const { t } = useTranslation()
  const { values, isSubmitting } = useFormikContext<AddSessionFormType>()
  const { isBusy } = values

  return (
    <React.Fragment>
      {isBusy ? <Styles>{t('sessions:collapse')}</Styles> : null}
      <Button
        className="add-session__submit-btn"
        type="submit"
        // loading={isSubmitting}
        // disabled={isSubmitting}
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
