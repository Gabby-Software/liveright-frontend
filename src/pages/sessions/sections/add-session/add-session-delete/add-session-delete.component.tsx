import React from 'react'
import { useDispatch } from 'react-redux'

import Button from '../../../../../components/buttons/button/button.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { ACTION_TRAINER_REMOVE_SESSION_REQUEST } from '../../../../../store/action-types'

interface Props {
  session_id: number
  onClose?: () => void
}

const AddSessionDelete: React.FC<Props> = (props) => {
  const { session_id, onClose } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch({
      type: ACTION_TRAINER_REMOVE_SESSION_REQUEST,
      payload: { id: session_id }
    })

    if (onClose) {
      onClose()
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={handleDelete}
      className="add-session__delete-btn"
    >
      {t('sessions:delete')}
    </Button>
  )
}

export default AddSessionDelete
