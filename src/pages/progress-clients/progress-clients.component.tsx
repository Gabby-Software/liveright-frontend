import { SearchIcon } from '../../assets/media/icons'
import Card from '../../components/cards/card/card.component'
import ClientProgressCard from '../../components/cards/client-progress-card/client-progress-card.component'
import Input from '../../components/form/input/input.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../components/placeholders'
import { Routes } from '../../enums/routes.enum'
import useClients from '../../hooks/api/clients/useClients'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { getRoute } from '../../utils/routes'
import { Styles } from './progress-clients.styles'

export default function ProgressClients() {
  const { t } = useTranslation()
  const { clients, isLoading, onSearch } = useClients()

  return (
    <Styles>
      <h3 className="progress__title">{t('progress:title')}</h3>

      <Card>
        <div className="progress__filters-container">
          <Input
            prefix={<SearchIcon />}
            placeholder={t('search')}
            id="progress-search"
            className="progress__search"
            onChange={(e) => onSearch(e.target.value)}
          />

          {/*<ClientSelect*/}
          {/*  placeholder={t('filter-by-client')}*/}
          {/*  id="progress-select"*/}
          {/*  onChange={() => console.log('')}*/}
          {/*  className="progress__client"*/}
          {/*/>*/}
        </div>

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
      </Card>
    </Styles>
  )
}
