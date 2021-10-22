import moment from 'moment'
import { HeaderProps, ToolbarProps, View } from 'react-big-calendar'

import { CaretLeftIcon, SearchIcon } from '../../assets/media/icons'
import { getEventTitle } from '../../utils/api/calendar'
import { TIME_FORMAT, TIME_RENDER_FORMAT } from '../../utils/date'
import IconButton from '../buttons/icon-button/icon-button.component'
import Ellipsis from '../ellipsis/ellipsis.component'
import Input from '../form/input/input.component'
import Tabs from '../tabs/tabs.component'
import {
  DateCellWrapperStyles,
  ToolbarStyles,
  WeekHeaderStyles
} from './calendar.styles'

const TABS = [
  {
    label: 'Monthly',
    key: 'month',
    renderContent: () => <></>
  },
  {
    label: 'Weekly',
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
  return (
    <ToolbarStyles>
      <Tabs
        className="calendar-toolbar__tabs"
        tabs={TABS}
        activeKey={view}
        onChange={(key) => onView(key as View)}
      />

      <div className="calendar-toolbar__cell">
        <IconButton
          size="sm"
          className="calendar-toolbar__prev"
          onClick={() => onNavigate('PREV')}
        >
          <CaretLeftIcon />
        </IconButton>

        <p className="calendar-toolbar__label">{label}</p>

        <IconButton
          size="sm"
          className="calendar-toolbar__next"
          onClick={() => onNavigate('NEXT')}
        >
          <CaretLeftIcon />
        </IconButton>
      </div>

      <Input
        id="calendar-search"
        size="sm"
        suffix={<SearchIcon />}
        placeholder="What are you looking for?"
        className="calendar-toolbar__search"
      />
    </ToolbarStyles>
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
  return (
    <WeekHeaderStyles>
      <p>{date.format('ddd')}</p>
      <p className="week-header__num">{date.format('DD')}</p>
    </WeekHeaderStyles>
  )
}
