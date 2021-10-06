import { useState } from 'react'
import ICalendarLink from 'react-icalendar-link'

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
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import Tabs from '../../../../components/tabs/tabs.component'
import PageTitle from '../../../../components/titles/page-title.styles'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import useClients from '../../../../hooks/api/clients/useClients'
import useClientCredits from '../../../../hooks/api/credits/useClientCredits'
import { UseSession } from '../../../../hooks/api/sessions/useSession'
import { UseSessions } from '../../../../hooks/api/sessions/useSessions'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useDesktopLayoutConfig } from '../../../../layouts/desktop-layout/desktop-layout.config'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionStatus, SessionType } from '../../../../types/session.type'
import ProgressCard from '../../components/progress-card/progress-card.component'
import ScheduleCard from '../../components/schedule-card/schedule-card.component'
import SessionsTable from '../../components/sessions-table/sessions-table.component'
import AddSessionDesktop from '../../sections/add-session/add-session-desktop/add-session-desktop.component'
import { getCalenderEvent } from '../../sessions.utils'
import Styles from './desktop-sessions.styles'

export default function DesktopSessions({
  filters,
  sessions,
  onFilters,
  onSearch,
  changeStatus,
  isLoading: isSessionsLoading,
  meta,
  onPage,
  mutate,
  onCancel
}: UseSessions & UseSession) {
  const { t } = useTranslation()
  const { clients } = useClients()
  const { statistic, count, onRange } = useStatistic()

  const [addOpen, setAddOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<SessionType>()

  const { credits, isLoading } = useClientCredits(filters.client_id)

  useDesktopLayoutConfig({
    className: 'sessions__layout'
  })

  const renderUpcomingItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <Button variant="secondary" size="sm" onClick={() => setEditOpen(item)}>
          {t('sessions:edit-reschedule')}
        </Button>

        <ICalendarLink event={getCalenderEvent(item, 'trainer')}>
          <IconButton
            size="sm"
            tooltip="Calendar"
            // to={Routes.CALENDAR}
            className="sessions__row-doc-btn"
          >
            <DocumentOutlinedIcon />
          </IconButton>
        </ICalendarLink>
        <IconButton
          size="sm"
          tooltip="Remove"
          onClick={() => onCancel(item.id)}
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
              value={filters.client_id || null}
              onChange={(e) => onFilters('client_id', e === 'all' ? '' : e)}
            />
          </div>
          {filters.client_id && (
            <CreditsButton
              color="secondary"
              count={credits}
              loading={isLoading}
            />
          )}
        </div>

        {isSessionsLoading ? (
          <LoadingPlaceholder />
        ) : !sessions.length ? (
          <EmptyPlaceholder />
        ) : (
          <div className="sessions__cards-grid">
            {sessions.map((it) => {
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
        )}

        <DataPagination
          page={meta.current_page}
          setPage={onPage}
          total={meta.total}
        />
      </Card>
    )
  }

  const renderUpcomingContent = () => {
    return (
      <SessionsTable
        meta={meta}
        sessions={sessions}
        renderOptions={renderUpcomingItemOptions}
        withFilter
        FilterProps={{ calendar: true }}
        loading={isSessionsLoading}
        onPage={onPage}
        filters={filters}
        onFilters={onFilters}
        onSearch={onSearch}
      />
    )
  }

  const renderPastContent = () => {
    return (
      <SessionsTable
        sessions={sessions}
        meta={meta}
        withFilter
        FilterProps={{ calendar: false }}
        loading={isSessionsLoading}
        onPage={onPage}
        filters={filters}
        onFilters={onFilters}
        onSearch={onSearch}
      />
    )
  }

  const isPast = filters.status === 'past'
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
              activeKey={filters.status}
              onChange={(e) => changeStatus(e as SessionStatus)}
              tabs={[
                {
                  key: 'awaiting_scheduling',
                  label: t('sessions:awaiting'),
                  renderContent: renderAwaitingContent
                },
                {
                  key: 'upcoming',
                  label: t('sessions:upcoming'),
                  renderContent: renderUpcomingContent
                },
                {
                  key: 'past',
                  label: t('sessions:past'),
                  renderContent: renderPastContent
                }
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

      <AddSessionDesktop
        mutate={mutate}
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
      />
      <AddSessionDesktop
        mutate={mutate}
        isOpen={!!editOpen}
        session={editOpen}
        onClose={() => setEditOpen(undefined)}
      />
    </>
  )
}
