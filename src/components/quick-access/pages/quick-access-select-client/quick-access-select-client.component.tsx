import { SearchIcon } from '../../../../assets/media/icons'
import useClientsPaginate from '../../../../hooks/api/clients/useClientsPaginate'
import { AccountObjType } from '../../../../types/account.type'
import Button from '../../../buttons/button/button.component'
import UserBadgeCard from '../../../cards/user-bardge-card/user-badge-card.component'
import Input from '../../../form/input/input.component'
import { EmptyPlaceholder, LoadingPlaceholder } from '../../../placeholders'
import { useQuickAccess } from '../../quick-access.context'
import Styles from './quick-access-select-client.styles'

export default function QuickAccessSelectClient() {
  const { setClient } = useQuickAccess()
  const { clients, onSearch, isLoading } = useClientsPaginate({
    per_page: 3,
    status: 'active'
  })

  return (
    <Styles>
      <Input
        id="quick-log-search"
        prefix={<SearchIcon />}
        placeholder="Search client to log to"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="qa-search__clients">
        {isLoading ? (
          <LoadingPlaceholder />
        ) : !clients.length ? (
          <EmptyPlaceholder />
        ) : (
          clients.map((client: AccountObjType) => (
            <UserBadgeCard
              circle
              key={client.id}
              firstName={client.first_name}
              lastName={client.last_name}
              userRole={client.email}
              img={client.avatar?.url}
              className="qa-search__badge"
              component={
                <Button
                  variant="secondary"
                  size="sm"
                  className="qa-search__btn"
                  onClick={() => setClient(client)}
                >
                  Select
                </Button>
              }
            />
          ))
        )}
      </div>
    </Styles>
  )
}
