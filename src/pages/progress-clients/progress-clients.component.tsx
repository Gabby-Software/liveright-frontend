import { SearchIcon } from '../../assets/media/icons'
import Card from '../../components/cards/card/card.component'
import ClientProgressCard from '../../components/cards/client-progress-card/client-progress-card.component'
import DataPagination from '../../components/data-pagination/data-pagination.component'
import Input from '../../components/form/input/input.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../components/placeholders'
import { Routes } from '../../enums/routes.enum'
import useClientsPaginate from '../../hooks/api/clients/useClientsPaginate'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { getRoute } from '../../utils/routes'
import { Styles } from './progress-clients.styles'

export default function ProgressClients() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const { clients, meta, isLoading, onSearch, onPage } = useClientsPaginate()

  const filters = (
    <div className="progress__filters-container">
      <Input
        prefix={<SearchIcon />}
        placeholder={t('search')}
        id="progress-search"
        className="progress__search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )

  const content = (
    <Styles>
      {!isMobile && <h3 className="progress__title">{t('progress:title')}</h3>}

      {isMobile && filters}

      <Card>
        {!isMobile && filters}

        {isLoading ? (
          <LoadingPlaceholder />
        ) : !clients.length ? (
          <EmptyPlaceholder />
        ) : (
          <div className="progress__cards-container">
            {clients.map((client) => (
              <ClientProgressCard
                key={client.id}
                to={getRoute(Routes.PROGRESS_HEALTH_DATA, {
                  id: client.id
                })}
                firstName={client.first_name}
                lastName={client.last_name}
                avatar={client.avatar?.url}
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
    <MobilePage title={t('progress:title')}>{content}</MobilePage>
  ) : (
    content
  )
}
