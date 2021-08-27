import { Field, FieldProps } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'

import FormButton from '../../../../../components/forms/form-button/form-button.component'
import { Routes } from '../../../../../enums/routes.enum'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import Styles from './add-session-credits.styles'

type Props = {}

const AddSessionCredits = ({}: Props) => {
  const { t } = useTranslation()
  return (
    <Field name={'sessions'}>
      {({ field, form }: FieldProps) => {
        return (
          <Styles className={'add-session__form__credits'}>
            <div className="add-session__credits-left">
              <p className="add-session__credits-left-text">
                {t('sessions:remind-credits')}
              </p>
              <p className="add-session__credits-left-value">
                &nbsp;
                {form.values.type === 'Paid PT' ? field.value - 1 : field.value}
              </p>
            </div>
            {form.values.type === 'Paid PT' && field.value <= 0 ? (
              <Link
                to={
                  Routes.CREATE_INVOICE +
                  `?${new URLSearchParams({
                    type: 'PT session',
                    cid: form.values.client_id || ''
                  }).toString()}`
                }
              >
                <FormButton type={'default'}>Invoice Now</FormButton>
              </Link>
            ) : null}
          </Styles>
        )
      }}
    </Field>
  )
}

export default AddSessionCredits
