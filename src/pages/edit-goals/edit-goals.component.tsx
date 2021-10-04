import { FC } from 'react'

import { Routes } from '../../enums/routes.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import EditGoalsCardList from './components/edit-goals-form/edit-goals-form.component'
import EditGoalsSuggestions from './components/edit-goals-suggestions/edit-goals-suggestions.component'
import { EditGoalsHead } from './edit-goals.styles'

interface EditGoalsProps {}

const EditGoals: FC<EditGoalsProps> = ({}) => {
  const isMobile = useIsMobile()
  const content = (
    <>
      <EditGoalsHead>Define Your Target</EditGoalsHead>
      <EditGoalsCardList />
      <EditGoalsSuggestions />
    </>
  )

  return (
    <>
      {isMobile ? (
        <>
          <MobilePage
            headerTopComponent={
              <HeaderLink to={Routes.FINANCIALS_GOALS}>
                Return to Goals
              </HeaderLink>
            }
            title="Define Your Targets"
            headerNavChat
          >
            {content}
          </MobilePage>
        </>
      ) : (
        content
      )}
    </>
  )
}

export default EditGoals
