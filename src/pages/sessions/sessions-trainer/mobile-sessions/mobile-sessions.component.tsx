import React, { useState } from 'react'

import {
  ChatIcon,
  ClientSolidIcon,
  DocumentOutlinedIcon,
  GroupSolidIcon,
  OptionSolidIcon,
  PhoneSolidIcon,
  RevenueSolidIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../../components/cards/card/card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Select from '../../../../components/form/select/select.component'
import Tabs from '../../../../components/tabs/tabs.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionsState } from '../../../../store/reducers/sessions.reducer'
import {
  SessionFilter,
  SessionStatus,
  SessionType
} from '../../../../types/session.type'
import ProgressCard from '../../components/progress-card/progress-card.component'
import ScheduleCard from '../../components/schedule-card/schedule-card.component'
import SessionsCards from '../../components/sessions-mobile-cards/sessions-mobile-cards.component'
import Styles from './mobile-sessions.styles'

interface Props {
  sessions: SessionsState
  getSessions: (
    status: SessionStatus
  ) => (page: number, filters?: SessionFilter) => void
  onRemoveSession: (id: number) => void
}

const MobileSessions: React.FC<Props> = (props) => {
  const { sessions, getSessions, onRemoveSession } = props
  const { upcoming, awaiting_scheduling, past } = sessions
  const awaitingMeta = awaiting_scheduling.meta
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState('')
  const [filters, setFilters] = useState<SessionFilter>({})
  const { statistic, count, onRange } = useStatistic()

  const handleFilter = (name: keyof SessionFilter, value: string) => {
    let newFilter = { ...filters }
    if (value) {
      newFilter = { ...newFilter, [name]: value }
    } else {
      delete newFilter[name]
    }

    setFilters(newFilter)
    getSessions('awaiting_scheduling')(1, newFilter)
  }

  const renderUpcomingItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <div>
          <Button
            variant="secondary"
            size="sm"
            to={`/sessions/schedule/edit?session=${JSON.stringify(item)}`}
          >
            {t('sessions:edit-reschedule')}
          </Button>
        </div>

        <div>
          <IconButton size="sm" className="sessions__doc-btn">
            <DocumentOutlinedIcon />
          </IconButton>
        </div>
      </div>
    )
  }

  const renderAwaitingContent = () => {
    return (
      <div className="sessions__container">
        <div className="sessions__client-filter-container">
          <ClientSelect
            id="sessions-client-filter"
            placeholder={t('sessions:filter-by-client')}
            value={filters.client_id}
            onChange={(e) => handleFilter('client_id', e === 'all' ? null : e)}
          />
        </div>

        <Card>
          {awaiting_scheduling.data.map((it) => (
            <ScheduleCard
              key={it.id}
              firstName={it.client?.user?.first_name || ''}
              lastName={it.client?.user?.last_name || ''}
              userAvatar={it.client?.user?.avatar?.url || ''}
              editTo={`/sessions/schedule/confirm?session=${JSON.stringify(
                it
              )}`}
              className="sessions__schedule-card"
              schedule={it.is_awaiting_scheduling}
              reschedule={it.is_awaiting_rescheduling}
              scheduleDate={it.client_request?.date}
              scheduleTime={it.client_request?.time}
              currentDate={it.starts_at}
            />
          ))}
          <DataPagination
            justify="start"
            page={awaitingMeta.current_page}
            setPage={getSessions('awaiting_scheduling')}
            total={awaitingMeta.current_page}
          />
        </Card>
      </div>
    )
  }

  const renderUpcomingContent = () => {
    return (
      <SessionsCards
        withFilter
        filterCalendar
        renderOptions={renderUpcomingItemOptions}
        sessions={upcoming}
        getSessions={getSessions('upcoming')}
        onRemoveSession={onRemoveSession}
      />
    )
  }

  const renderPastContent = () => {
    return (
      <div className="sessions__cards-container">
        <SessionsCards
          withFilter
          sessions={past}
          getSessions={getSessions('past')}
        />
      </div>
    )
  }

  const isPast = currentTab === 'Past'
  return (
    <MobilePage
      title={t('sessions:title')}
      headerTitleIcon={<ChatIcon />}
      actionComponent={
        <Button to="/sessions/schedule/new">{t('sessions:new-session')}</Button>
      }
      headerSpacing={15}
    >
      <Styles>
        <Tabs
          className="sessions__tabs"
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
          onChange={(e) => setCurrentTab(e)}
        />

        {!isPast && (
          <div className="sessions__progress">
            <div className="sessions__divider" />

            <h1 className="mobile-layout__title sessions__title">
              {t('sessions:progress')}
            </h1>

            <div className="sessions__progress-range-container">
              <Select
                id="sessions-progress-range"
                options={statisticRangeOptions}
                defaultValue={statisticRange.WEEK}
                onChange={onRange}
              />
            </div>

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

            <Button
              variant="secondary"
              onClick={() => {}}
              className="sessions__manage-btn"
            >
              {t('sessions:manage-targets')}
            </Button>
          </div>
        )}
      </Styles>
    </MobilePage>
  )
}

export default MobileSessions
