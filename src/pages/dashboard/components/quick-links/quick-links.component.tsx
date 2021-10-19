import {
  AddGroupIcon,
  PlanIcon,
  CalendarIcon,
  InvoiceIcon,
  WorkoutIconV2,
  AddDocumentIcon
} from '../../../../assets/media/icons/index'
import { Styles, Link } from './quick.links.style'

export interface ILink {
  label: string
  icon: JSX.Element
}

const links: ILink[] = [
  { label: 'Add Client', icon: <AddGroupIcon /> },
  { label: 'Training Plans', icon: <PlanIcon /> },
  { label: 'Schedule Session', icon: <CalendarIcon /> },
  { label: 'Issue Invoice', icon: <InvoiceIcon /> },
  { label: 'Latest Activity', icon: <WorkoutIconV2 /> },
  { label: 'Add Event', icon: <AddDocumentIcon /> }
]

export const LinkIcon = ({ label, icon }: ILink) => {
  return (
    <Link>
      <div className="wrapper-icon">
        <div className="icon">{icon}</div>
      </div>
      <p>{label}</p>
    </Link>
  )
}

export const QuickLinks = () => {
  return (
    <Styles>
      {links.map((item) => (
        <LinkIcon key={item.label} label={item.label} icon={item.icon} />
      ))}
    </Styles>
  )
}
