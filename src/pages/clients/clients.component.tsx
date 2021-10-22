import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parseQuery } from '../../utils/query'

import {
  ExerciseIconV2,
  FilterIcon,
  FoodIconV2,
  MeasurementIconV2,
  SearchIcon,
  WorkoutIconV2
} from '../../assets/media/icons'
import BottomDrawer from '../../components/bottom-drawer/bottom-drawer.component'
import Button from '../../components/buttons/button/button.component'
import IconButton from '../../components/buttons/icon-button/icon-button.component'
import Card from '../../components/cards/card/card.component'
import AddClientDrawer from '../../components/clients/add-client-modal/add-client-drawer/add-client-drawer.component'
import { clientFormSteps } from '../../components/clients/add-client-modal/add-client-modal.context'
import DataPagination from '../../components/data-pagination/data-pagination.component'
import DataTable from '../../components/data-table/data-table.component'
import Input from '../../components/form/input/input.component'
import Select from '../../components/form/select/select.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../components/placeholders'
import Tabs from '../../components/tabs/tabs.component'
import { Title } from '../../components/typography'
import { Routes } from '../../enums/routes.enum'
import { onlyTrainer } from '../../guards/trainer.guard'
import useClientsPaginate from '../../hooks/api/clients/useClientsPaginate'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { DrawerContent, Styles } from './clients.styles'

const LABELS: string[] = [
  'clients:client-name',
  'profile:email',
  'profile:phone',
  'clients:sessions',
  'clients:status',
  'clients:actions'
]

const KEYS: string[] = [
  'name',
  'email',
  'phone_number',
  'sessions',
  'status',
  'actions'
]

const ACTIONS = [
  {
    icon: WorkoutIconV2,
    title: 'Workshops'
  },
  {
    icon: ExerciseIconV2,
    title: 'Exercises'
  },
  {
    icon: FoodIconV2,
    title: 'Meals'
  },
  {
    icon: MeasurementIconV2,
    title: 'Measures'
  }
]

const TABS = [
  {
    label: 'Clients',
    key: 'clients',
    renderContent: () => <></>
  },
  {
    label: 'Leads',
    key: 'leads',
    renderContent: () => <></>
  }
]

function Clients() {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const [filterDrawer, setFilterDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState('clients')
  const [addDialog, setAddDialog] = useState(false)
  const [step, setStep] = useState(clientFormSteps.EMAIL)

  useEffect(() => {
    const { show_modal } = parseQuery(location.search)
    if (show_modal) {
      setAddDialog(true)
    }
  }, [])

  const { clients, isLoading, meta, onSearch, onPage, mutate } =
    useClientsPaginate({
      status: activeTab === 'clients' ? 'active' : 'awaiting'
    })

  const formatKeys =
    activeTab === 'clients' ? KEYS : KEYS.filter((key) => key !== 'sessions')
  const formatLabels =
    activeTab === 'clients'
      ? LABELS
      : LABELS.filter((key) => key !== 'clients:sessions')

  const tabs = (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      tabs={TABS}
      className={isMobile ? '' : 'clients__tabs'}
      justify={isMobile ? 'between' : undefined}
    />
  )

  const search = (
    <Input
      id="clients-search"
      placeholder="Search for Client Name"
      prefix={<SearchIcon />}
      className="clients__filter-search"
      onChange={(e) => onSearch(e.target.value)}
    />
  )

  const status = (
    <Select
      id="clients-status"
      options={[]}
      placeholder="All Status"
      className="clients__filter-status"
    />
  )

  const filter = (
    <div className="clients__filter-container">
      <div>{tabs}</div>

      <div className="clients__filter">
        {search}
        {status}
      </div>
    </div>
  )

  const mobileFilter = (
    <div className="clients__filter-container">
      {search}

      <IconButton
        className="clients__filter-btn"
        onClick={() => setFilterDrawer(true)}
      >
        <FilterIcon />
      </IconButton>
    </div>
  )

  const placeholders = isLoading ? (
    <LoadingPlaceholder spacing />
  ) : !clients.length ? (
    <EmptyPlaceholder spacing />
  ) : null

  const content = (
    <>
      <Styles>
        {!isMobile && (
          <div className="clients__title-container">
            <Title>Clients</Title>

            <Button onClick={() => setAddDialog(true)}>Add New Client</Button>
          </div>
        )}

        {isMobile && tabs}
        {isMobile && mobileFilter}

        <Card>
          {!isMobile && filter}

          {!isMobile ? (
            <div className="clients__table-container">
              <DataTable
                labels={formatLabels}
                keys={formatKeys}
                data={clients}
                render={{
                  name: (data) => (
                    <Link to={`${Routes.CLIENTS}/${data.id}`}>
                      {data.first_name} {data.last_name}
                    </Link>
                  ),
                  phone_number: (data) =>
                    data.accounts?.[0]?.['phone_number'] || '-',
                  status: (data) => capitalize(data.extras?.status),
                  sessions: (data) =>
                    t('clients:sessions-remind', {
                      n: data.extras?.credits || 0
                    }),
                  actions: () => (
                    <div className="clients__table-actions">
                      {activeTab === 'clients' ? (
                        ACTIONS.map((a, index) => (
                          <IconButton
                            key={index}
                            className="clients__table-action"
                            size="sm"
                          >
                            <a.icon />
                          </IconButton>
                        ))
                      ) : (
                        <Button variant="secondary" size="sm">
                          Resend Invitation
                        </Button>
                      )}
                    </div>
                  )
                }}
              />

              {placeholders}
            </div>
          ) : (
            <div>
              {placeholders}

              {clients.map((client) => (
                <Link to={`${Routes.CLIENTS}/${client.id}`} key={client.id}>
                  <Card className="clients__client-card">
                    <p className="clients__client-card-title">
                      {client.first_name} {client.last_name}
                    </p>
                    <p className="clients__client-card-subtitle">
                      {t('clients:sessions-remind', {
                        n: client.extras?.credits || 0
                      })}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <DataPagination
            page={meta.current_page}
            setPage={onPage}
            total={meta.total}
            justify={isMobile ? 'center' : 'end'}
          />
        </Card>
      </Styles>

      {isMobile && (
        <BottomDrawer
          title="Filter Clients"
          isOpen={filterDrawer}
          onClose={() => setFilterDrawer(false)}
        >
          <DrawerContent>
            {status}
            <Button>Apply Filter</Button>
          </DrawerContent>
        </BottomDrawer>
      )}

      {!isMobile && (
        <AddClientDrawer
          title={t('clients:add')}
          isOpen={addDialog}
          onClose={() => {
            setAddDialog(false)
            mutate()
          }}
          onSubmit={mutate}
          width="32.5rem"
          step={step}
          setStep={setStep}
        />
      )}
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Client"
      actionComponent={<Button to="/add-new-client">Add Client</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}

export default onlyTrainer(Clients)
