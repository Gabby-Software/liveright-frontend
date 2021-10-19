import { ToolbarProps } from 'react-big-calendar'

import { SearchIcon } from '../../assets/media/icons'
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

      <div>
        <p className="calendar-toolbar__label">{props.label}</p>
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
