/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormikHelpers } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ReactComponent as SearchIcon } from '../../../assets/media/icons/search-2.svg'
import { useClients } from '../../../hooks/clients.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { ACTION_GET_CLIENTS_REQUEST } from '../../../store/action-types'
import { OptionType } from '../../../types/option.type'
import Input from '../../form/input/input.component'
import Select from '../../form/select/select.component'
import FormRow from '../../forms/form-row/form-row.component'
import Styles from './clients-filter.styles'

type FilterType = {
  search: string
}
const initialValues = {
  search: ''
}

type ClientFilterProps = {
  onSetQuery: (param: string) => any
  onSetType: (param: string) => any
  onSetStatus: (param: string) => any
  query: string
  status: string
  type: string
}

const ClientsFilter = ({
  onSetQuery,
  onSetType,
  onSetStatus,
  query,
  status,
  type
}: ClientFilterProps) => {
  const { t } = useTranslation()
  // const timer = useRef(0)
  // const [modalOpen, setModalOpen] = useState(false)
  // const { filters, data } = useClients()
  // const dispatch = useDispatch()
  // const [query, setQuery] = useState('')
  // const [type, setType] = useState('')
  // const [status, setStatus] = useState('')

  // const fetchClients = () => {
  //   clearTimeout(timer.current)
  //   timer.current = setTimeout(() => {
  //     dispatch({
  //       type: ACTION_GET_CLIENTS_REQUEST,
  //       payload: {
  //         query,
  //         type,
  //         status,
  //         page: 0
  //       }
  //     })
  //   }, 400) as unknown as number
  // }
  // useEffect(fetchClients, [query, type, status])
  // useEffect(() => {
  //   const params = new URLSearchParams(document.location.search)
  //   const add = params.get('add')
  //   if (add) {
  //     setModalOpen(true)
  //   }
  // }, [])

  const handleSubmit = (
    values: FilterType,
    helper: FormikHelpers<FilterType>
  ) => {
    // todo: handle submition
    helper.setSubmitting(false)
  }
  const typeOptions: OptionType[] = [
    { label: 'All', value: '' },
    { label: 'Leads', value: 'leads' },
    { label: 'Clients', value: 'clients' }
  ]
  const statusOptions: OptionType[] = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Awaiting', value: 'awaiting' },
    { label: 'Past', value: 'past' }
  ]
  return (
    <Styles>
      <FormRow>
        <Input
          id={'search'}
          prefix={<SearchIcon />}
          value={query}
          label={''}
          onChange={(e) => onSetQuery(e.target.value)}
          placeholder={t('clients:search')}
        />
        <Select
          className="client__status-filter"
          id={'status'}
          value={status}
          label={''}
          options={statusOptions}
          onChange={onSetStatus}
          placeholder={t('clients:all-status')}
        />
        <div />
        <div />
      </FormRow>
    </Styles>
  )
}

export default ClientsFilter
