import Button from '../../components/buttons/button/button.component'
import { Routes } from '../../enums/routes.enum'

export default function Activities() {
  return (
    <>
      <Button to={Routes.ACTIVITIES_TP}>Training Plans</Button>
    </>
  )
}
