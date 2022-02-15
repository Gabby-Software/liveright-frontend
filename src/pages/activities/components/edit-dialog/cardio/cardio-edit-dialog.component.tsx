import cloneDeep from 'lodash.clonedeep'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import Dialog from '../../../../../components/dialogs/dialog/dialog.component'
import MobileFullScreenDialog from '../../../../../components/dialogs/mobile-fullscreen-dialog/mobile-fullscreen-dialog.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import CardioEdit from './cardio-edit.component'

interface CardioEditDialogProps {
  data?: any
  name: string
  open: boolean
  onClose?: (result?: any) => void
}
const CardioEditDialog = (props: CardioEditDialogProps) => {
  const { data, name, open, onClose } = props
  const isMobile = useIsMobile()

  const methods = useFormContext()
  const prevData = methods.getValues(name)
  const [tpPrevData] = useState<any>(cloneDeep(prevData))

  const onDropDownClose = () => {
    methods.setValue(name, tpPrevData)
    onClose?.()
  }

  if (isMobile) {
    return (
      <MobileFullScreenDialog
        title="Edit Cardio"
        headerTopComponent={
          <HeaderLink onClick={onDropDownClose}>Go Back</HeaderLink>
        }
      >
        <CardioEdit data={data} name={name} onClose={onClose} />
      </MobileFullScreenDialog>
    )
  }

  return (
    <Dialog title="Edit Cardio" extended open={open} onClose={onDropDownClose}>
      <CardioEdit data={data} name={name} onClose={onClose} />
    </Dialog>
  )
}

export default CardioEditDialog
