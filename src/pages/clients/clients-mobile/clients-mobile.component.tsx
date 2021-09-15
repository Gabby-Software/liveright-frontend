import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '../../../components/buttons/button/button.component'
import Card from '../../../components/card/card.style'
import AddClientModal from '../../../components/clients/add-client-modal/add-client-modal.component'
import ClientsFilterMobile from '../../../components/clients/clients-filter-mobile/clients-filter-mobile.component'
import DataPagination from '../../../components/data-pagination/data-pagination.component'
import PopOnScroll from '../../../components/pop-on-scroll/pop-on-scroll.component'
import { Routes } from '../../../enums/routes.enum'
import { useClients } from '../../../hooks/clients.hook'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { classes } from '../../../pipes/classes.pipe'
import { ACTION_GET_CLIENTS_REQUEST } from '../../../store/action-types'
import Styles from './clients-mobile.styles'

const ClientsMobile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const {
    data: { data, meta },
    filters,
    loading,
    error
  } = useClients()

  const refetchClients = () => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        ...filters,
        page: 1
      }
    })
  }
  useEffect(() => {
    const params = new URLSearchParams(document.location.search)
    const add = params.get('add')
    if (add) {
      setIsOpen(true)
    }
  }, [])

  const setPage = (page: number) => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: {
        page,
        query: filters.query,
        status: filters.status
      }
    })
  }

  return (
    <MobilePage
      title={t('clients:title')}
      headerNavChat
      actionComponent={
        <Button onClick={() => setIsOpen(true)}>
          {t('clients:add-mobile')}
        </Button>
      }
    >
      <Styles>
        <div className="clients__filter-wrapper">
          <ClientsFilterMobile />
        </div>
        <div className={'clients__heading'}>
          {loading ? (
            <Skeleton />
          ) : error ? (
            <p className={'clients__error'}>{error}</p>
          ) : !data?.length ? (
            <p>{t('clients:no-data')}</p>
          ) : (
            data.map(({ first_name, last_name, id, sessions, status }) => {
              const Wrapper =
                status === 'awaiting'
                  ? ({ children }: any) => <a>{children}</a>
                  : Link
              return (
                <PopOnScroll key={id} offset={100}>
                  <Wrapper to={`${Routes.CLIENTS}/${id}`}>
                    <Card className={classes('clients__card')} key={id}>
                      <div className={classes('clients__name')}>
                        {first_name} {last_name}
                      </div>
                      <div className={'clients__label'}>
                        {t('clients:sessions-remind', { n: sessions || 0 })}
                      </div>
                    </Card>
                  </Wrapper>
                </PopOnScroll>
              )
            })
          )}
          <DataPagination
            page={meta.current_page}
            setPage={setPage}
            total={meta.total}
          />
        </div>
        <AddClientModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={refetchClients}
        />
      </Styles>
    </MobilePage>
  )
}

export default ClientsMobile
