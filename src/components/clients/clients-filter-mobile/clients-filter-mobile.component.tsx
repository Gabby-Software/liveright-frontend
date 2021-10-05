import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SearchIcon } from '../../../assets/media/icons'
import { ReactComponent as FilterIcon } from '../../../assets/media/icons/filter.svg'
import Input from '../../../components/form/input/input.component'
import { useClients } from '../../../hooks/clients.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { ACTION_GET_CLIENTS_REQUEST } from '../../../store/action-types'
import { OptionType } from '../../../types/option.type'
import { ActiveFilterCard, ActiveFilters } from '../../active-filters'
import BottomDrawer from '../../bottom-drawer/bottom-drawer.component'
import Button from '../../buttons/button/button.component'
import IconButton from '../../buttons/icon-button/icon-button.component'
import ClientSelect from '../../form/client-select/client-select.component'
import Styles from './clients-filter-mobile.styles'

type SubmitType = { status: string; query: string }

const ClientsFilterMobile = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [option, setOption] = useState<OptionType>({
    label: 'All Status',
    value: ''
  })
  const [query, setQuery] = useState<string>('')
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
  const handleSubmit = ({ status, query }: SubmitType) => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        page: meta.current_page,
        status,
        query
      }
    })
    setOpen(false)
  }
  const statusOptions: OptionType[] = [
    { label: 'All Status', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Awaiting', value: 'awaiting' },
    { label: 'Past', value: 'past' }
  ]
  return (
    <Styles>
      <div className="clients__filter-search">
        <div className="clients__filter-search-wrapper">
          <Input
            id="sessions-search"
            placeholder={t('clients:filter-input-mobile')}
            prefix={<SearchIcon />}
            onChange={(e) => {
              setQuery(e.target.value)
              handleSubmit({ status: option.value, query: e.target.value })
            }}
          />
        </div>
        <div className="clients__filter-button-wrapper">
          <IconButton
            className="clients__filter-button"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <FilterIcon />
          </IconButton>
        </div>
      </div>

      {option.label !== 'All Status' ? (
        <ActiveFilters>
          <ActiveFilterCard
            label={'Status'}
            value={option.label}
            onDelete={() => {
              setOption({ label: 'All Status', value: '' })
            }}
          />
        </ActiveFilters>
      ) : null}

      <BottomDrawer
        title={t('clients:filters')}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <BottomDrawer.Body>
          <Styles>
            <ClientSelect
              id={'status'}
              label={t('clients:status')}
              options={statusOptions}
              onChange={(v, option) => {
                console.log({ v, option })
                setOption(option)
              }}
              value={option.value}
            />
            <Button
              onClick={() => handleSubmit({ status: option.value, query })}
              className="client__drawer-button"
            >
              {t('submit')}
            </Button>
          </Styles>
        </BottomDrawer.Body>
      </BottomDrawer>
    </Styles>
  )
}

export default ClientsFilterMobile
