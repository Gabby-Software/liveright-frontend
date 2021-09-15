import { useFormikContext } from 'formik'
import React, { FC } from 'react'

import { CaretLeftIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { useInvoiceForm } from '../../../create-invoice.context'
import Styles from './create-invoice-mobile-actions.styles'

type Props = {
  back?: number
  backText?: string
}

const CreateInvoiceMobileActions: FC<Props> = ({ back, backText }) => {
  const { t } = useTranslation()
  const { submitForm } = useFormikContext()
  const { setStep } = useInvoiceForm()

  return (
    <Styles>
      <Button
        className="ci-actions__next"
        onClick={() => submitForm()}
        type="submit"
      >
        {t('next')}
      </Button>

      {typeof back === 'number' && !!backText && (
        <Button
          variant="text"
          onClick={() => setStep(back)}
          className="ci-actions__back"
        >
          <CaretLeftIcon />
          {backText}
        </Button>
      )}
    </Styles>
  )
}

export default CreateInvoiceMobileActions
