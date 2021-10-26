import { ButtonStyles } from './dashboard-button.styles'

export const DashboardButton = ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return <ButtonStyles>{children}</ButtonStyles>
}
