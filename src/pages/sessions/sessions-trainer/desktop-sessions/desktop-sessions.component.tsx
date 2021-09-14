import { FC, useState } from 'react'

import {
  ClientSolidIcon,
  DeleteOutlinedIcon,
  DocumentOutlinedIcon,
  GroupSolidIcon,
  OptionSolidIcon,
  PhoneSolidIcon,
  RevenueSolidIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import CreditsButton from '../../../../components/buttons/credits-button/credits-button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../../components/cards/card/card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Select from '../../../../components/form/select/select.component'
import Tabs from '../../../../components/tabs/tabs.component'
import PageTitle from '../../../../components/titles/page-title.styles'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import { Routes } from '../../../../enums/routes.enum'
import useClients from '../../../../hooks/api/clients/useClients'
import useClientCredits from '../../../../hooks/api/credits/useClientCredits'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useDesktopLayoutConfig } from '../../../../layouts/desktop-layout/desktop-layout.config'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionsState } from '../../../../store/reducers/sessions.reducer'
import {
  SessionFilter,
  SessionStatus,
  SessionType
} from '../../../../types/session.type'
import ProgressCard from '../../components/progress-card/progress-card.component'
import ScheduleCard from '../../components/schedule-card/schedule-card.component'
import SessionsTable from '../../components/sessions-table/sessions-table.component'
import AddSessionDesktop from '../../sections/add-session/add-session-desktop/add-session-desktop.component'
import Styles from './desktop-sessions.styles'

interface Props {
  sessions: SessionsState
  getSessions: (
    status: SessionStatus
  ) => (page: number, filters?: SessionFilter) => void
  onRemoveSession: (id: number) => void
}

const DesktopSessions: FC<Props> = (props) => {
  const { sessions, getSessions, onRemoveSession } = props
  const { upcoming, awaiting_scheduling, past } = sessions
  const { t } = useTranslation()
  const { clients } = useClients()
  const { statistic, count, onRange } = useStatistic()

  const [addOpen, setAddOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<SessionType>()
  const [additionalFilter, setAdditionalFilter] = useState<SessionFilter>()
  const [activeTab, setActiveTab] = useState('')

  const { credits, isLoading } = useClientCredits(
    additionalFilter?.['client_id']
  )

  useDesktopLayoutConfig({
    className: 'sessions__layout'
  })

  const handleClientFilterChange = (value: string) => {
    const filter: SessionFilter = value === 'all' ? {} : { client_id: +value }
    getSessions('awaiting_scheduling')(1, filter)
    setAdditionalFilter(filter)
  }

  const renderUpcomingItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <Button variant="secondary" size="sm" onClick={() => setEditOpen(item)}>
          {t('sessions:edit-reschedule')}
        </Button>

        <IconButton
          size="sm"
          tooltip="Calendar"
          to={Routes.CALENDAR}
          className="sessions__row-doc-btn"
        >
          <DocumentOutlinedIcon />
        </IconButton>
        <IconButton
          size="sm"
          tooltip="Remove"
          onClick={() => onRemoveSession(item.id)}
          className="sessions__row-remove-btn"
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    )
  }

  const renderAwaitingContent = () => {
    return (
      <Card>
        <div className="sessions__filter-form-wrapper">
          <div className="sessions__awaiting-filter">
            <ClientSelect
              id="sessions-client-filter"
              placeholder={t('sessions:filter-by-client')}
              onChange={handleClientFilterChange}
            />
          </div>
          {additionalFilter?.['client_id'] && (
            <CreditsButton
              color="secondary"
              count={credits}
              loading={isLoading}
            />
          )}
        </div>

        <div className="sessions__cards-grid">
          {awaiting_scheduling.data.map((it) => {
            return (
              <ScheduleCard
                key={it.id}
                firstName={it.client?.user?.first_name || ''}
                lastName={it.client?.user?.last_name || ''}
                userAvatar={it.client?.user?.avatar?.url || ''}
                onEdit={() => setEditOpen(it)}
                schedule={it.is_awaiting_scheduling}
                reschedule={it.is_awaiting_rescheduling}
                scheduleDate={it.client_request?.date}
                scheduleTime={it.client_request?.time}
                currentDate={it.starts_at}
              />
            )
          })}
        </div>

        <DataPagination
          page={awaiting_scheduling.meta.current_page}
          setPage={() => {}}
          total={awaiting_scheduling.meta.total}
        />
      </Card>
    )
  }

  const renderUpcomingContent = () => {
    return (
      <SessionsTable
        sessions={upcoming}
        getSessions={getSessions('upcoming')}
        renderOptions={renderUpcomingItemOptions}
        withFilter
        FilterProps={{ calendar: true }}
      />
    )
  }

  const renderPastContent = () => {
    return (
      <SessionsTable
        getSessions={getSessions('past')}
        sessions={past}
        withFilter
        FilterProps={{ calendar: false }}
      />
    )
  }

  const isPast = activeTab === 'Past'
  return (
    <>
      <Styles>
        <div className="sessions">
          <div className="sessions__main">
            <PageTitle className="sessions__title">
              {t('sessions:title')}
              <Button onClick={() => clients.length && setAddOpen(true)}>
                {t('sessions:schedule-new')}
              </Button>
            </PageTitle>

            <Tabs
              onChange={(e) => setActiveTab(e)}
              tabs={[
                {
                  label: t('sessions:awaiting'),
                  renderContent: renderAwaitingContent
                },
                {
                  label: t('sessions:upcoming'),
                  renderContent: renderUpcomingContent
                },
                { label: t('sessions:past'), renderContent: renderPastContent }
              ]}
            />
          </div>

          {!isPast && (
            <div className="sessions__right">
              <PageTitle>{t('sessions:progress')}</PageTitle>

              <div className="sessions__date-range">
                <Select
                  id="sessions-progress-range"
                  options={statisticRangeOptions}
                  defaultValue={statisticRange.WEEK}
                  onChange={onRange}
                />
              </div>

              <div className="sessions__progress">
                <ProgressCard
                  title={t('revenue')}
                  current={count.total || 0}
                  target={0}
                  icon={<RevenueSolidIcon />}
                  money
                  earn={statistic.total || 0}
                />
                <ProgressCard
                  title={t('sessions:ptSessions')}
                  current={count.pt || 0}
                  target={0}
                  icon={<GroupSolidIcon />}
                  earn={statistic.pt_sessions || 0}
                />
                <ProgressCard
                  title={t('sessions:coaching')}
                  current={count.coaching || 0}
                  target={0}
                  icon={<ClientSolidIcon />}
                  earn={statistic.coaching_sessions || 0}
                />
                <ProgressCard
                  title={t('sessions:consultation')}
                  current={count.consultation || 0}
                  target={0}
                  icon={<PhoneSolidIcon />}
                  earn={statistic.consultations_sessions || 0}
                />
                <ProgressCard
                  title={t('sessions:other')}
                  current={0}
                  target={0}
                  icon={<OptionSolidIcon />}
                  earn={statistic.other || 0}
                />
              </div>

              <div className="sessions__right-footer">
                <Button className="sessions__manage-btn" variant="secondary">
                  {t('sessions:manage-targets')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Styles>

      <AddSessionDesktop isOpen={addOpen} onClose={() => setAddOpen(false)} />
      <AddSessionDesktop
        isOpen={!!editOpen}
        session={editOpen}
        onClose={() => setEditOpen(undefined)}
      />
    </>
  )
}

export default DesktopSessions
