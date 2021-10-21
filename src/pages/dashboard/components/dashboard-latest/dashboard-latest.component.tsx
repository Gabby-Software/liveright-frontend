import { useState } from 'react'
import Button from '../../../../components/buttons/button/button.component'
import Tabs from '../../../../components/tabs/tabs.component'
import { CheckedIcon } from '../../../../assets/media/icons'
import UserImage from '../../../../assets/media/User.png'
import { Styles } from './dashboard-latest.styles'

const TABS = [
  {
    label: 'Diet',
    key: 'diet',
    renderContent: () => <List />
  },
  {
    label: 'Training',
    key: 'training',
    renderContent: () => <div></div>
  },
  {
    label: 'Payment',
    key: 'payment',
    renderContent: () => <div></div>
  },
  {
    label: 'Inactivity',
    key: 'inactivity',
    renderContent: () => <div></div>
  }
]
const DATA = [
  {
    id: '4',
    avatar: UserImage,
    name: 'John Travolta',
    description: 'just completed amazing deal',
    completed: true
  },
  {
    id: '1',
    avatar: UserImage,
    name: 'John Travolta',
    description: 'just completed amazing deal',
    completed: true
  },
  {
    id: '2',
    avatar: UserImage,
    name: 'John Travolta',
    description: 'just completed amazing deal',
    completed: true
  },
  {
    id: '3',
    avatar: UserImage,
    name: 'John Travolta',
    description: 'just completed amazing deal',
    completed: true
  }
]
const List = () => (
  <ul className="list">
    {DATA.map((item) => (
      <li className="item" key={item.id}>
        <div>
          <img
            width="30px"
            height="30px"
            className="item__avatar"
            src={item.avatar}
            alt="avatar"
          />
          <p className="item__name">{item.name}</p>
        </div>
        <p className="item__description">{item.description}</p>
        {item.completed && <CheckedIcon className="item__icon" />}
      </li>
    ))}
  </ul>
)
export const DashboardLatest = () => {
  const [activeTab, setActiveTab] = useState('diet')

  return (
    <Styles>
      <div className="wrapper">
        <h2 className="wrapper-title">The Latest</h2>
        <Button className="wrapper-button">View Notifications</Button>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabs={TABS}
        className={'latest__tabs'}
        // justify={isMobile ? 'between' : undefined}
      />
    </Styles>
  )
}
