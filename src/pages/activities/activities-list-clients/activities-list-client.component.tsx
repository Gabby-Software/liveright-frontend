import { useLocation } from 'react-router'

import { SearchIcon } from '../../../assets/media/icons'
import Card from '../../../components/cards/card/card.component'
import ClientactivitiesCard from '../../../components/cards/client-progress-card/client-progress-card.component'
import DataPagination from '../../../components/data-pagination/data-pagination.component'
import Input from '../../../components/form/input/input.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../components/placeholders'
import { Routes } from '../../../enums/routes.enum'
import useClientsPaginate from '../../../hooks/api/clients/useClientsPaginate'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { getRoute } from '../../../utils/routes'
import { Styles } from './activities-list-client.styles'

export default function ActivitiesListClients() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const { clients, meta, isLoading, onSearch, onPage } = useClientsPaginate({
    status: 'active'
  })

  const getTitle = () => {
    const returnURL = (searchParams.get('return') || '').split('/')
    switch (returnURL[returnURL.length - 1]) {
      case 'training-plans':
        return 'Training Plans'
      case 'diet-plans':
        return 'Diet Plans'
      case 'curr-plan':
        return 'Current Plan'
      case 'training-splits':
        return 'Training Splits'
      default:
        return 'Activities'
    }
  }

  const filters = (
    <div className="activities__filters-container">
      <Input
        prefix={<SearchIcon />}
        placeholder={t('search')}
        id="activities-search"
        className="activities__search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )

  const content = (
    <Styles>
      {!isMobile && <h3 className="activities__title">{getTitle()}</h3>}

      {isMobile && filters}

      <Card>
        {!isMobile && filters}

        {isLoading ? (
          <LoadingPlaceholder />
        ) : !clients.length ? (
          <EmptyPlaceholder text="No Clients" />
        ) : (
          <div className="activities__cards-container">
            {clients.map((client) => (
              <ClientactivitiesCard
                key={client.id}
                to={getRoute(
                  searchParams.get('return') || Routes.ACTIVITIES_CURR_PLAN,
                  {
                    clientId: client.id
                  }
                )}
                firstName={client.first_name}
                lastName={client.last_name}
                avatar={client.avatar?.url}
                uuid={client.uuid}
                id={client.id}
              />
            ))}
          </div>
        )}

        <DataPagination
          justify={isMobile ? 'center' : 'end'}
          page={meta.current_page}
          setPage={onPage}
          total={meta.total}
        />
      </Card>
    </Styles>
  )

  return isMobile ? (
    <MobilePage title={t('activities:title')} headerNavChat>
      {content}
    </MobilePage>
  ) : (
    content
  )
}
