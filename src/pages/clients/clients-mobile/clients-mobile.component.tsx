import { Skeleton } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Card from '../../../components/card/card.style'
import ClientsFilterMobile from '../../../components/clients/clients-filter-mobile/clients-filter-mobile.component'
import MobileClientFooter from '../../../components/clients/mobile-client-footer/mobile-client-footer.component'
import DataPagination from '../../../components/data-pagination/data-pagination.component'
import PopOnScroll from '../../../components/pop-on-scroll/pop-on-scroll.component'
import { Routes } from '../../../enums/routes.enum'
import { useClients } from '../../../hooks/clients.hook'
import { useMobileTitleContent } from '../../../layouts/mobile-layout/mobile-layout.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { classes } from '../../../pipes/classes.pipe'
import { ACTION_GET_CLIENTS_REQUEST } from '../../../store/action-types'
import Styles from './clients-mobile.styles'

const ClientsMobile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    data: { data, meta },
    filters,
    loading,
    error
  } = useClients()
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
  useMobileTitleContent(<ClientsFilterMobile />)
  return (
    <Styles>
      <div className={'clients__heading'}>
        {loading ? (
          <Skeleton />
        ) : error ? (
          <p className={'clients__error'}>{error}</p>
        ) : !data?.length ? (
          <p>{t('clients:no-data')}</p>
        ) : (
          data.map(
            ({ first_name, last_name, id, user_uuid, sessions, status }) => {
              const Wrapper =
                status === 'awaiting'
                  ? ({ children }: any) => <a>{children}</a>
                  : Link
              return (
                // eslint-disable-next-line react/jsx-key
                <PopOnScroll offset={100}>
                  <Wrapper to={`${Routes.CLIENTS}/${user_uuid}`}>
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
            }
          )
        )}
        <DataPagination
          page={meta.current_page}
          setPage={setPage}
          total={meta.total}
        />
      </div>
      <MobileClientFooter />
    </Styles>
  )
}

export default ClientsMobile
