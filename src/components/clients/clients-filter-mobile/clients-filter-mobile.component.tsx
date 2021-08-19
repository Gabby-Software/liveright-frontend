import { Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ReactComponent as FilterIcon } from '../../../assets/media/icons/filter.svg'
import { useClients } from '../../../hooks/clients.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { ACTION_GET_CLIENTS_REQUEST } from '../../../store/action-types'
import { OptionType } from '../../../types/option.type'
import BottomDrawer from '../../bottom-drawer/bottom-drawer.component'
import ButtonSubmit from '../../forms/button-submit/button-submit.component'
import FormInputLabeled from '../../forms/form-input-labeled/form-input-labeled.component'
import FormSelect from '../../forms/form-select/form-select.component'
import Styles from './clients-filter-mobile.styles'

type FilterType = {
  query: string
  status: string
  type: string
}

const ClientsFilterMobile = () => {
  const [isOpen, setOpen] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    filters,
    data: { meta }
  } = useClients()
  useEffect(() => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        page: 1,
        ...filters
      }
    })
  }, [])
  const handleSubmit = (
    values: FilterType,
    helper: FormikHelpers<FilterType>
  ) => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        page: meta.current_page,
        ...values,
        onSuccess: () => {
          helper.setSubmitting(false)
        },
        onError: () => {
          helper.setSubmitting(false)
        }
      }
    })
    setOpen(false)
  }
  const statusOptions: OptionType[] = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Awaiting', value: 'awaiting' },
    { label: 'Past', value: 'past' }
  ]
  return (
    <Styles>
      <FilterIcon
        className={'mobile-filters__trigger'}
        onClick={() => setOpen(true)}
      />
      <BottomDrawer
        title={t('clients:filters')}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <BottomDrawer.Body>
          <Formik
            onSubmit={handleSubmit}
            initialValues={filters}
            enableReinitialize
          >
            <Form>
              <Styles>
                <FormInputLabeled name={'query'} label={t('search')} />
                <FormSelect
                  name={'status'}
                  label={t('clients:status')}
                  options={statusOptions}
                />
                <ButtonSubmit>{t('submit')}</ButtonSubmit>
              </Styles>
            </Form>
          </Formik>
        </BottomDrawer.Body>
      </BottomDrawer>
    </Styles>
  )
}

export default ClientsFilterMobile
