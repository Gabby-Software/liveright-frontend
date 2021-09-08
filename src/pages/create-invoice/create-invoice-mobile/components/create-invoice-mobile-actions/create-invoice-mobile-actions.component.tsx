import { useFormikContext } from 'formik'
import React, { FC } from 'react'

import Button from '../../../../../components/buttons/button/button.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import Styles from './create-invoice-mobile-actions.styles'

type Props = {
  back?: number
}
const CreateInvoiceMobileActions: FC<Props> = ({ back }) => {
  const { t } = useTranslation()
  const { submitForm, values } = useFormikContext()
  // const { setStep } = useInvoiceForm()
  console.log(values)
  return (
    <Styles>
      {/*{back !== undefined ? (*/}
      {/*  <But*/}
      {/*    type={'default'}*/}
      {/*    className={'ci-actions__back'}*/}
      {/*    onClick={() => setStep(back)}*/}
      {/*  >*/}
      {/*    {t('back')}*/}
      {/*  </But>*/}
      {/*) : null}*/}
      <Button
        className="ci-actions__next"
        onClick={() => submitForm()}
        type="submit"
      >
        {t('next')}
      </Button>
    </Styles>
  )
}

export default CreateInvoiceMobileActions
