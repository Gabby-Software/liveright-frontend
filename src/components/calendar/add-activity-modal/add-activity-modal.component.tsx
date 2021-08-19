import React from 'react'

import Modal from '../../modal/modal.component'
import Styles from './add-activity-modal.styles'

type Props = {
  isOpen: boolean
  onCancel: () => boolean
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddActivityModal = ({ isOpen, onCancel }: Props) => {
  return (
    <Modal visible>
      <Styles>
        {/*<Formik>*/}

        {/*</Formik>*/}
      </Styles>
    </Modal>
  )
}

export default AddActivityModal
