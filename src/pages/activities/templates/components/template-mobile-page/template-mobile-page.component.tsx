import React from 'react'

import {
  DeleteOutlinedIcon,
  OptionsIcon
} from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem
} from '../../../../../components/dropdown'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import TemplateLayout from '../../../components/layout/layout.component'
import Styles from './template-mobile-page.styles'

interface IProps {
  actionComponent?: React.ReactNode
  pageTitle: string
  contentTitle: string
  onEdit?: () => void
  onDelete?: () => void
}

const TemplateMobilePage: React.FC<IProps> = ({
  actionComponent,
  pageTitle,
  contentTitle,
  onEdit,
  onDelete,
  children
}) => {
  const dropdownMenu = (
    <DropdownMenu>
      {onEdit && (
        <DropdownMenuItem>
          <Button
            variant="text"
            className="TSTemplates__title-button"
            onClick={onEdit}
          >
            Edit Template
          </Button>
        </DropdownMenuItem>
      )}
      {onDelete && (
        <DropdownMenuItem>
          <Button
            variant="text"
            onClick={onDelete}
            className="TSTemplates__topbar-delete"
          >
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </DropdownMenuItem>
      )}
    </DropdownMenu>
  )

  return (
    <MobilePage
      title={pageTitle}
      headerSpacing={16}
      actionComponent={actionComponent}
      headerNavChat
    >
      <TemplateLayout>
        <Styles>
          <section className="TSTemplates__title-container">
            <h1 className="TSTemplates__title">{contentTitle}</h1>
            <Dropdown overlay={dropdownMenu}>
              <OptionsIcon />
            </Dropdown>
          </section>
          <div className="TSTemplates__divider" />
          {children}
        </Styles>
      </TemplateLayout>
    </MobilePage>
  )
}

export default TemplateMobilePage
