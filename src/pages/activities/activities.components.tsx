import Button from '../../components/buttons/button/button.component'
import { Routes } from '../../enums/routes.enum'
import { Styles } from './activities.styles'

export default function Activities() {
  return (
    <Styles>
      <Button to={Routes.ACTIVITIES_TP}>Training Plans</Button>
      <Button to={Routes.ACTIVITIES_DP}>Diet Plans</Button>
      <Button to={Routes.ACTIVITIES_CURR_PLAN}>My Current Plan</Button>
      <Button to={Routes.ACTIVITIES_TS}>Training Splits</Button>
    </Styles>
  )
}
