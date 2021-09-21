import { ReactElement, ReactNode } from 'react'

import { Card, CardTitle } from '../../../components/profile-components'

interface ClientProfileCardProps {
  title?: ReactNode
  children: ReactElement[] | ReactElement
  className?: string
}

export default function ClientProfileCard({
  title,
  children,
  className
}: ClientProfileCardProps) {
  return (
    <Card className={className}>
      {typeof title === 'string' ? <CardTitle>{title}</CardTitle> : title}
      {children}
    </Card>
  )
}
