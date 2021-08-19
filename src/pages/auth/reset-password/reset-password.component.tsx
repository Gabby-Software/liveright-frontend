import { Form, Formik, FormikProps } from 'formik'
import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router'
import * as Yup from 'yup'

import logoCompact from '../../../assets/media/logo-compact.png'
import ButtonSubmit from '../../../components/forms/button-submit/button-submit.component'
import FormPassword from '../../../components/forms/form-password/form-password.component'
import { onlyGuest } from '../../../guards/guest.guard'
import { AuthFormContext } from '../../../modules/auth/auth.context'
import { AuthFormTypeNotNull } from '../../../modules/auth/auth-form.type'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Styles, { Logo, Wrapper } from '../styles'

type PasswordType = {
  new_password: string
  confirm_new_password: string
}
const ResetPassword = () => {
  const { t } = useTranslation()
  const { form } = useContext(AuthFormContext) as AuthFormTypeNotNull
  const [submitted, setSubmitted] = useState<boolean>(false)
  const handleSubmit = (
    form: PasswordType,
    submitProps: { setSubmitting: (submitting: boolean) => void }
  ) => {
    console.log(form)
    alert(`submitted!\n${JSON.stringify(form)}`)
    submitProps.setSubmitting(false)
    setSubmitted(true)
  }
  if (submitted) return <Redirect to={'/'} />
  return (
    <Styles>
      <Wrapper>
        <Logo alt={'liveright'} src={logoCompact} />
        <h1 className={'forgot-password__title'}>
          {t('auth:recover-password')}
        </h1>
        <div className={'forgot-password__hr'} />
        <h2 className={'forgot-password__desc'} />
        <Formik
          initialValues={form}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            new_password: Yup.string().required().min(8).password(),
            confirm_new_password: Yup.string()
              .required()
              .equals([Yup.ref('new_password')], 'passwords-not-match')
          })}
        >
          {(form: FormikProps<PasswordType>) => (
            <Form>
              <FormPassword
                name={'new_password'}
                label={t('auth:new-password')}
              />
              <FormPassword
                name={'confirm_new_password'}
                label={t('auth:confirm-password')}
              />
              {/*<FormInputLabeled type={'password'} name={'new_password'} label={t('auth:new-password')}/>*/}
              {/*<FormInputLabeled type={'password'} name={'confirm_new_password'} label={t('auth:confirm-password')}/>*/}
              <ButtonSubmit {...form}>{t('auth:change-password')}</ButtonSubmit>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Styles>
  )
}

export default onlyGuest(ResetPassword)
