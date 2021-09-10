import { components } from 'react-select'

import UserBadge from '../../user-badge/user-badge.component'

export function Option(props: any) {
  if (['all', ''].includes(props.data.value)) {
    return <components.Option {...props} />
  }
  return (
    <components.Option {...props}>
      <UserBadge
        avatar={props.data.avatar}
        firstName={props.data.firstName}
        lastName={props.data.lastName}
        square
      />
    </components.Option>
  )
}
