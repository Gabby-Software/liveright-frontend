import React from 'react'
import { Link } from 'react-router-dom'

import FormButton from '../../components/forms/form-button/form-button.component'
import { Routes } from '../../enums/routes.enum'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import Styles from './page-not-found.styles'

const PageNotFound = () => {
  const { t } = useTranslation()
  return (
    <Styles>
      <div className={'pnf__cont'}>
        <h1>404</h1>
        <p>{t('not-found-desc')}</p>
        <Link to={Routes.HOME}>
          <FormButton type={'primary'}>{t('back-home')}</FormButton>
        </Link>
      </div>
    </Styles>
  )
}

export default PageNotFound
