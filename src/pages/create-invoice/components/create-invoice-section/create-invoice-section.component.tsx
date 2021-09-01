import React from 'react'

import Styles from './create-invoice-section.styles'

type Props = {
  title: string
  children: React.ReactNode
}
const CreateInvoiceSection = ({ title, children }: Props) => {
  return (
    <Styles>
      <h5 className="create-invoice__section-title">{title}</h5>

      <div className="create-invoice__content">{children}</div>
    </Styles>
  )
}

export default CreateInvoiceSection
