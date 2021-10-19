import { ToolbarProps } from 'react-big-calendar'

import { CaretLeftIcon, SearchIcon } from '../../assets/media/icons'
import IconButton from '../buttons/icon-button/icon-button.component'
import Input from '../form/input/input.component'
import Tabs from '../tabs/tabs.component'
import { ToolbarStyles } from './calendar.styles'

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
  }
]

export function Toolbar(props: ToolbarProps) {
  console.log(props)
  return (
    <ToolbarStyles>
      <Tabs className="calendar-toolbar__tabs" tabs={TABS} />

      <div className="calendar-toolbar__cell">
        <IconButton size="sm" className="calendar-toolbar__prev">
          <CaretLeftIcon />
        </IconButton>

        <p className="calendar-toolbar__label">{props.label}</p>

        <IconButton size="sm" className="calendar-toolbar__next">
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
