import { useFormikContext } from 'formik'
import React from 'react'

import Alert from '../../../../../components/alerts/alert/alert.component'
import useClientCredits from '../../../../../hooks/api/credits/useClientCredits'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import { Styles } from './add-session-credits.styles'

type Props = {}

const AddSessionCredits = ({}: Props) => {
  const { t } = useTranslation()
  const { values } = useFormikContext<AddSessionFormType>()
  const { credits, isLoading } = useClientCredits(values.client_id)
  const isPt = values.type === 'Paid PT'
  const leftCredits = isPt ? credits - 1 : credits
  const noCredits = leftCredits < 0
  return (
    <>
      <Styles className={'add-session__form__credits'}>
        <div className="add-session__credits-left">
          <p className="add-session__credits-left-text">
            {t('sessions:remind-credits')}
          </p>
          <p className="add-session__credits-left-value">
            {isLoading ? '-' : leftCredits}
          </p>
        </div>
        {/*{form.values.type === 'Paid PT' && field.value <= 0 ? (*/}
        {/*  <Link*/}
        {/*    to={*/}
        {/*      Routes.CREATE_INVOICE +*/}
        {/*      `?${new URLSearchParams({*/}
        {/*        type: 'PT session',*/}
        {/*        cid: form.values.client_id || ''*/}
        {/*      }).toString()}`*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <FormButton type={'default'}>Invoice Now</FormButton>*/}
        {/*  </Link>*/}
        {/*) : null}*/}
      </Styles>

      {isPt && noCredits && values.client_id && (
        <Alert message={t('sessions:no-credits')} />
      )}
    </>
  )
}

export default AddSessionCredits
