import { Formik } from 'formik'
import React, { useState } from 'react'

import {
  ClientSolidIcon,
  DeleteOutlinedIcon,
  DocumentOutlinedIcon,
  GroupSolidIcon,
  OptionSolidIcon,
  PhoneSolidIcon,
  RevenueSolidIcon
} from '../../../../assets/media/icons'
import { ReactComponent as RightArrowIcon } from '../../../../assets/media/icons/caret-right.svg'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../../components/cards/card/card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import Select from '../../../../components/form/select/select.component'
import FormSelect from '../../../../components/forms/form-select/form-select.component'
import Tabs from '../../../../components/tabs/tabs.component'
import PageTitle from '../../../../components/titles/page-title.styles'
import { Routes } from '../../../../enums/routes.enum'
import { sessionDateRangeOptions } from '../../../../enums/session-filters.enum'
import { useClients } from '../../../../hooks/clients.hook'
import { useDesktopLayoutConfig } from '../../../../layouts/desktop-layout/desktop-layout.config'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionsState } from '../../../../store/reducers/sessions.reducer'
import {
  SessionFilter,
  SessionStatus,
  SessionType
} from '../../../../types/session.type'
import ProgressCard from '../../components/progress-card/progress-card.component'
import SessionUserAvatar from '../../components/session-user-avatar/session-user-avatar.component'
import SessionsTable from '../../components/sessions-table/sessions-table.component'
import AddSessionDesktop from '../../sections/add-session/add-session-desktop/add-session-desktop.component'
import Styles, { ScheduleCard } from './desktop-sessions.styles'

interface Props {
  sessions: SessionsState
  getSessions: (
    status: SessionStatus
  ) => (page: number, filters?: SessionFilter) => void
  onRemoveSession: (id: number) => void
}

const DesktopSessions: React.FC<Props> = (props) => {
  const { sessions, getSessions, onRemoveSession } = props
  const { upcoming, awaiting_scheduling, past } = sessions
  const { t } = useTranslation()
  const clients = useClients()
  const clientsData = clients.data.data.filter((it) => it.is_active)
  const [addOpen, setAddOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<SessionType>()
  const [additionalFilter, setAdditionalFilter] = useState<SessionFilter>()
  const [activeTab, setActiveTab] = useState('')

  useDesktopLayoutConfig({
    className: 'sessions__layout'
  })

  const handleClientFilterChange = (value: string) => {
    if (value === 'All') {
      setAdditionalFilter(undefined)
    } else {
      setAdditionalFilter({ client_id: +value })
    }
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
            <Select
              id="sessions-client-filter"
              placeholder={t('sessions:filter-by-client')}
              // onUpdate={handleClientFilterChange}
              options={[{ label: 'All', value: 'All' }].concat(
                clientsData.map((it) => ({
                  label: `${it.first_name} ${it.last_name}`,
                  value: it.id.toString()
                }))
              )}
            />
          </div>
        </div>

        <div className="sessions__cards-grid">
          {awaiting_scheduling.data.map((it) => {
            return (
              <ScheduleCard key={it.id}>
                <SessionUserAvatar
                  avatar={it.client?.user.avatar}
                  first_name={it.client?.user.first_name}
                  last_name={it.client?.user.last_name}
                />
                <Button
                  size="sm"
                  variant="text"
                  className="sessions__schedule_button"
                  onClick={() => setEditOpen(it)}
                >
                  <span>{t('sessions:schedule-now')}</span>
                  <RightArrowIcon />
                </Button>
              </ScheduleCard>
            )
          })}
        </div>

        <DataPagination page={1} setPage={() => {}} total={1} />
      </Card>
    )
  }

  const renderUpcomingContent = () => {
    return (
      <SessionsTable
        sessions={upcoming}
        getSessions={getSessions('upcoming')}
        renderOptions={renderUpcomingItemOptions}
        additionalFilters={additionalFilter}
        withFilter
        FilterProps={{ calendar: true }}
      />
    )
  }

  const renderPastContent = () => {
    return (
      <SessionsTable
        getSessions={getSessions('past')}
        additionalFilters={additionalFilter}
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
              Your Sessions
              <Button onClick={() => clientsData.length && setAddOpen(true)}>
                {t('sessions:schedule-new')}
              </Button>
            </PageTitle>

            <Tabs
              className="sessions__tabs"
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
                  options={sessionDateRangeOptions}
                  defaultValue={sessionDateRangeOptions[0].value}
                />
              </div>

              <div className="sessions__progress">
                <ProgressCard
                  title={t('revenue')}
                  current={300}
                  target={400}
                  icon={<RevenueSolidIcon />}
                  money
                />
                <ProgressCard
                  title={t('sessions:ptSessions')}
                  current={5}
                  target={10}
                  icon={<GroupSolidIcon />}
                  earn={500}
                />
                <ProgressCard
                  title={t('sessions:coaching')}
                  current={5}
                  target={10}
                  icon={<ClientSolidIcon />}
                  earn={500}
                />
                <ProgressCard
                  title={t('sessions:consultation')}
                  current={5}
                  target={10}
                  icon={<PhoneSolidIcon />}
                  earn={500}
                />
                <ProgressCard
                  title={t('sessions:other')}
                  current={12}
                  target={10}
                  icon={<OptionSolidIcon />}
                  earn={500}
                />
              </div>

              <div className="sessions__right-footer">
                <Button className="sessions__manage-btn" variant="secondary">
                  Manage Target
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
