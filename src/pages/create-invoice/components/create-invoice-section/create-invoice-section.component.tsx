import React from 'react'

import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import Styles from './create-invoice-section.styles'

type Props = {
  title: string
  children: React.ReactNode
}
const CreateInvoiceSection = ({ title, children }: Props) => {
  return (
    <Styles>
      <PageSubtitle className={'create-invoice__section-title'}>
        {title}
      </PageSubtitle>
      {children}
    </Styles>
  )
}

export default CreateInvoiceSection
