import moment from 'moment'
import { HeaderProps, ToolbarProps, View } from 'react-big-calendar'

import { CaretLeftIcon } from '../../assets/media/icons'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { getEventTitle } from '../../utils/api/calendar'
import { TIME_FORMAT, TIME_RENDER_FORMAT } from '../../utils/date'
import IconButton from '../buttons/icon-button/icon-button.component'
import Ellipsis from '../ellipsis/ellipsis.component'
import Tabs from '../tabs/tabs.component'
import {
  DateCellWrapperStyles,
  ToolbarMobileStyles,
  ToolbarNav,
  ToolbarSecondaryStyles,
  ToolbarStyles,
  WeekHeaderStyles
} from './calendar.styles'

const TABS = [
  {
    label: 'Month',
    key: 'month',
    renderContent: () => <></>
  },
  {
    label: 'Week',
    key: 'week',
    renderContent: () => <></>
  },
  {
    label: 'Day',
    key: 'day',
    renderContent: () => <></>
  }
]

interface CustomToolbarProps extends ToolbarProps {}

export function Toolbar({
  label,
  onNavigate,
  onView,
  view
}: CustomToolbarProps) {
  const isMobile = useIsMobile()

  const nav = (
    <ToolbarNav>
      <IconButton
        size="sm"
        className="toolbar-nav__prev"
        onClick={() => onNavigate('PREV')}
      >
        <CaretLeftIcon />
      </IconButton>

      <p className="toolbar-nav__label">{label}</p>

      <IconButton
        size="sm"
        className="toolbar-nav__next"
        onClick={() => onNavigate('NEXT')}
      >
        <CaretLeftIcon />
      </IconButton>
    </ToolbarNav>
  )

  if (isMobile) {
    return (
      <ToolbarMobileStyles>
        <Tabs
          className="calendar-toolbar__tabs"
          tabs={TABS}
          activeKey={view}
          onChange={(key) => onView(key as View)}
          justify="between"
        />

        <div>{nav}</div>
      </ToolbarMobileStyles>
    )
  }

  return (
    <ToolbarStyles>
      <Tabs
        className="calendar-toolbar__tabs"
        tabs={TABS}
        activeKey={view}
        onChange={(key) => onView(key as View)}
      />

      <div className="calendar-toolbar__cell">{nav}</div>
    </ToolbarStyles>
  )
}

export function ToolbarSecondary({ label, date, onNavigate }: ToolbarProps) {
  const isToday = moment(date).isSame(moment(), 'days')
  return (
    <ToolbarSecondaryStyles>
      <p className="toolbar-secondary__title">
        {isToday && <span>Today, </span>}
        {label}
      </p>

      <div className="toolbar-secondary__buttons">
        <IconButton
          size="sm"
          className="toolbar-secondary__next"
          onClick={() => onNavigate('PREV')}
        >
          <CaretLeftIcon />
        </IconButton>

        <IconButton
          size="sm"
          className="toolbar-secondary__prev"
          onClick={() => onNavigate('NEXT')}
        >
          <CaretLeftIcon />
        </IconButton>
      </div>
    </ToolbarSecondaryStyles>
  )
}

interface DateCellWrapperProps {
  activities: any[]
  isNow: boolean
}

export function DateCellWrapper({ activities, isNow }: DateCellWrapperProps) {
  return (
    <DateCellWrapperStyles $now={isNow} className="date-cell-wrapper">
      {activities.map((row) => {
        const label = getEventTitle(row)
        return (
          <p
            key={row._id}
            className="date-cell-wrapper__event"
            data-event-type={row.resource_type}
          >
            <Ellipsis>{label}</Ellipsis>
            {row.time && (
              <span className="date-cell-wrapper__event-time">
                {moment(row.time, TIME_FORMAT).format(TIME_RENDER_FORMAT)}
              </span>
            )}
          </p>
        )
      })}
    </DateCellWrapperStyles>
  )
}

export function WeekHeader(props: HeaderProps) {
  const date = moment(props.date)
  const isMobile = useIsMobile()
  return (
    <WeekHeaderStyles>
      <p>{date.format(isMobile ? 'dd' : 'ddd')}</p>
      <p className="week-header__num">{date.format('DD')}</p>
    </WeekHeaderStyles>
  )
}
