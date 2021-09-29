import React, { FC } from 'react'

import FinancialsGoalsCardList from './components/financials-goals-list/financial-goals-list.component'
import { TabTitle } from './financials-goals.styles'

const FinancialsGoals: FC = () => {
  return (
    <>
      <TabTitle>Overall Goals</TabTitle>
      <FinancialsGoalsCardList />
    </>
  )
}

export default FinancialsGoals
