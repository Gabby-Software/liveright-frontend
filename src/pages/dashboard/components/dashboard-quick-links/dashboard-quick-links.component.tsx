import { Link } from 'react-router-dom'

import {
  AddDocumentIcon,
  AddGroupIcon,
  CalendarIcon,
  InvoiceIcon,
  PlanIcon,
  WorkoutIconV2
} from '../../../../assets/media/icons/index'
import { Routes } from '../../../../enums/routes.enum'
import { LinkItem, Styles } from './dashboard-quick-links.style'

export interface ILink {
  label: string
  icon: JSX.Element
  path: string
}

const links: ILink[] = [
  {
    label: 'Add Client',
    icon: <AddGroupIcon />,
    path: Routes.CLIENTS + '?show_drawer=true'
  },
  {
    label: 'Training Plans',
    icon: <PlanIcon />,
    path: Routes.ACTIVITIES_TP.replace('/:clientId?', '/all')
  },
  {
    label: 'Schedule Session',
    icon: <CalendarIcon />,
    path: Routes.SESSIONS + '?show_drawer=true'
  },
  {
    label: 'Issue Invoice',
    icon: <InvoiceIcon />,
    path: Routes.CREATE_INVOICE
  },
  {
    label: 'Latest Activity',
    icon: <WorkoutIconV2 />,
    path: Routes.NOTIFICATIONS
  },
  { label: 'Add Event', icon: <AddDocumentIcon />, path: Routes.CALENDAR }
]

export const LinkIcon = ({ label, icon, path }: ILink) => {
  return (
    <LinkItem>
      <Link className="link" to={path}>
        <div className="li-icon-wrapper">
          <div className="icon">{icon}</div>
        </div>
        <p>{label}</p>
      </Link>
    </LinkItem>
  )
}

export const QuickLinks = () => {
  return (
    <Styles>
      {links.map((item) => (
        <LinkIcon
          key={item.label}
          label={item.label}
          icon={item.icon}
          path={item.path}
        />
      ))}
    </Styles>
  )
}
