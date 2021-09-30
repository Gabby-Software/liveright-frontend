import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import /* { ReactComponent as ExerciseIcon } */ ExerciseIcon from '../../../assets/media/icons/exercise_1.png'
import /* { ReactComponent as FoodIcon } */ FoodIcon from '../../../assets/media/icons/food_1.png'
import /* { ReactComponent as MeasureIcon } */ MeasureIcon from '../../../assets/media/icons/measure_1.png'
import /* { ReactComponent as WorkoutIcon } */ WorkoutIcon from '../../../assets/media/icons/workout_1.png'
import ActionIconWrapper from '../../../components/action-wrapper/action-wrapper.component'
import Button from '../../../components/buttons/button/button.component'
import AddClientDrawer from '../../../components/clients/add-client-modal/add-client-drawer/add-client-drawer.component'
import { clientFormSteps } from '../../../components/clients/add-client-modal/add-client-modal.context'
import ClientsFilter from '../../../components/clients/clients-filter/clients-filter.component'
import DataPagination from '../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../components/data-table/data-table.component'
import PageTitle from '../../../components/titles/page-title.styles'
import { Routes } from '../../../enums/routes.enum'
import { useClients } from '../../../hooks/clients.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { capitalize } from '../../../pipes/capitalize.pipe'
import { ACTION_GET_CLIENTS_REQUEST } from '../../../store/action-types'
// import { TableActionType } from '../../../types/table-action.type'
import SessionStyles from '../../sessions/sessions-trainer/desktop-sessions/desktop-sessions.styles'
import ClientContainer from './clients-desktop.styles'

type Props = {}
const ClientsDesktop = ({}: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState<number>(clientFormSteps.EMAIL)

  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const { t } = useTranslation()
  const timer = useRef(0)

  useEffect(() => {
    const params = new URLSearchParams(document.location.search)
    const add = params.get('add')
    if (add) {
      setModalOpen(true)
    }
  }, [])

  const {
    data: { data, meta },
    loading,
    error,
    filters
  } = useClients()
  const dataRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const labels: string[] = [
    'clients:client-name',
    'profile:email',
    'profile:phone',
    'clients:sessions',
    'clients:status',
    'clients:actions'
  ]
  const keys: string[] = [
    'name',
    'email',
    'phone_number',
    'sessions',
    'status',
    'actions'
  ]
  const actions = [
    {
      icon: (
        <img src={WorkoutIcon} alt={t('clients:workout')} />
      ) as React.ReactNode,
      onClick: () => {},
      title: 'Workshops'
    },
    {
      icon: <img src={ExerciseIcon} alt={t('clients:exercise')} />,
      onClick: () => {},
      title: 'Exercises'
    },
    {
      icon: <img src={FoodIcon} alt={t('clients:meals')} />,
      onClick: () => {},
      title: 'Meals'
    },
    {
      icon: <img src={MeasureIcon} alt={t('clients:measures')} />,
      onClick: () => {},
      title: 'Measures'
    }
  ]
  // const actions: TableActionType[] = [
  //   { icon: WorkoutIcon, onClick: () => {}, title: 'Workshops' },
  //   { icon: ExerciseIcon, onClick: () => {}, title: 'Exercises' },
  //   { icon: FoodIcon, onClick: () => {}, title: 'Meals' },
  //   { icon: MeasureIcon, onClick: () => {}, title: 'Measures' }
  // ]
  const setPage = (page: number) => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        query: filters.query,
        status: filters.status,
        page,
        onSuccess: () => {
          if (!dataRef.current) return
          window.scrollTo({
            top:
              window.scrollY + dataRef.current.getBoundingClientRect().top - 24,
            behavior: 'smooth'
          })
        }
      }
    })
  }

  const fetchClients = () => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        query,
        type,
        status,
        page: 1
      }
    })
  }

  const refetchClients = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(fetchClients, 400) as unknown as number
  }
  useEffect(refetchClients, [query, type, status])
  return (
    <>
      <SessionStyles>
        <div className="sessions">
          <div className="sessions__main">
            <PageTitle className="sessions__title">
              {t('clients:title')}
              <Button type={'primary'} onClick={() => setModalOpen(true)}>
                {t('clients:add')}
              </Button>
            </PageTitle>

            <ClientContainer>
              <ClientsFilter
                onSetQuery={setQuery}
                onSetStatus={setStatus}
                onSetType={setType}
                query={query}
                status={status}
                type={type}
              />
              <div ref={dataRef}>
                <DataTable
                  labels={labels}
                  data={data}
                  loading={loading}
                  error={error || data.length ? '' : t('clients:no-data')}
                  keys={keys}
                  render={{
                    name: ({ first_name, last_name, id, status }) =>
                      status === 'awaiting' ? (
                        <div className="clients__name">{`${first_name} ${last_name}`}</div>
                      ) : (
                        <Link
                          className="clients__name"
                          to={`${Routes.CLIENTS}/${id}`}
                        >{`${first_name} ${last_name}`}</Link>
                      ),
                    actions: () => (
                      <div className={'clients__activities'}>
                        {actions.map((item) => (
                          <ActionIconWrapper
                            key={item.title}
                            title={item.title || ''}
                          >
                            {item.icon}
                          </ActionIconWrapper>
                        ))}
                      </div>
                    ),
                    status: ({ status }) => capitalize(status),
                    sessions: ({ extras: { credits } }) =>
                      t('clients:sessions-remind', { n: credits || 0 })
                  }}
                  actionWidth="15rem"
                />
              </div>
              <DataPagination
                page={meta?.current_page}
                setPage={(current_page: number) => setPage(current_page)}
                total={meta?.total}
              />
            </ClientContainer>
          </div>
        </div>
      </SessionStyles>
      <AddClientDrawer
        title={t('clients:add')}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setTimeout(fetchClients, 7000)
        }}
        onSubmit={fetchClients}
        width="32.5rem"
        step={step}
        setStep={setStep}
      />
    </>
  )
}

export default ClientsDesktop
