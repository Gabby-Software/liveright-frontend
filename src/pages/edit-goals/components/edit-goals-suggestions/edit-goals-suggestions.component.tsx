import { FC } from 'react'

import { HelpIcon } from '../../../../assets/media/icons'
import {
  SuggestionsHead,
  SuggestionsTipsLink,
  SuggestionsTipsText,
  SuggestionsTipsWrapper,
  SuggestionsWrapper
} from './edit-goals-suggestions.styles'

interface EditGoalsSuggestionsProps {}

const EditGoalsSummary: FC<EditGoalsSuggestionsProps> = () => {
  return (
    <SuggestionsWrapper>
      <SuggestionsHead>CoachRight Suggestions</SuggestionsHead>
      <SuggestionsTipsWrapper>
        <SuggestionsTipsText>
          <HelpIcon />
          Try increasing your revenue persession
          <SuggestionsTipsLink>See tips</SuggestionsTipsLink>
        </SuggestionsTipsText>

        <SuggestionsTipsText>
          <HelpIcon />
          Try increasing your revenue persession
          <SuggestionsTipsLink>See tips</SuggestionsTipsLink>
        </SuggestionsTipsText>
      </SuggestionsTipsWrapper>
    </SuggestionsWrapper>
  )
}
export default EditGoalsSummary
