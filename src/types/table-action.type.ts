import React from 'react'

export type TableActionType = {
  icon: React.ComponentType<any>
  title?: string
  onClick: () => void
  color?: string
}
