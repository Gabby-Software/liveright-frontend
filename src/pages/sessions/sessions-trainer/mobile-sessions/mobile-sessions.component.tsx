import React from 'react'

import {
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
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import Tabs from '../../../../components/tabs/tabs.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import { UseSessions } from '../../../../hooks/api/sessions/useSessions'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionStatus, SessionType } from '../../../../types/session.type'
import ProgressCard from '../../components/progress-card/progress-card.component'
import ScheduleCard from '../../components/schedule-card/schedule-card.component'
import SessionsCards from '../../components/sessions-mobile-cards/sessions-mobile-cards.component'
import Styles from './mobile-sessions.styles'

export default function MobileSessions({
  filters,
  sessions,
  onFilters,
  onSearch,
  changeStatus,
  isLoading,
  meta,
  onPage
}: UseSessions) {
  const { t } = useTranslation()
  const { statistic, count, onRange } = useStatistic()

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
            onChange={(e) => onFilters('client_id', e === 'all' ? null : e)}
          />
        </div>

        <Card>
          {isLoading ? (
            <LoadingPlaceholder />
          ) : !sessions.length ? (
            <EmptyPlaceholder />
          ) : (
            sessions.map((it) => (
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
            ))
          )}

          <DataPagination
            justify="center"
            page={meta.current_page}
            setPage={onPage}
            total={meta.total}
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
        sessions={sessions}
        meta={meta}
        onSearch={onSearch}
        onPage={onPage}
        filters={filters}
        onFilters={onFilters}
        isLoading={isLoading}
      />
    )
  }

  const renderPastContent = () => {
    return (
      <div className="sessions__cards-container">
        <SessionsCards
          withFilter
          sessions={sessions}
          meta={meta}
          onSearch={onSearch}
          onPage={onPage}
          filters={filters}
          onFilters={onFilters}
          isLoading={isLoading}
        />
      </div>
    )
  }

  const isPast = filters.status === 'past'
  return (
    <MobilePage
      title={t('sessions:title')}
      headerNavChat
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
          onChange={(e) => changeStatus(e as SessionStatus)}
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
