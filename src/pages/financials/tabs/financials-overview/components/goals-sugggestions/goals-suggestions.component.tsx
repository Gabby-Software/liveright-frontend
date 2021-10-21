import { FC } from 'react'

import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import {
  SuggestionsHead,
  SuggestionsTipsLink,
  SuggestionsTipsText,
  SuggestionsTipsWrapper,
  SuggestionsWrapper
} from './goals-suggestions.styles'

interface EditGoalsSuggestionsProps {}

const GoalsSuggestions: FC<EditGoalsSuggestionsProps> = () => {
  const { t } = useTranslation()
  return (
    <SuggestionsWrapper>
      <SuggestionsHead>
        {t('financials:edit-goals.suggestions-title')}
      </SuggestionsHead>
      <SuggestionsTipsWrapper>
        <SuggestionsTipsText>
          {t('financials:edit-goals.increase-revenue')}
          <SuggestionsTipsLink>See tips</SuggestionsTipsLink>
        </SuggestionsTipsText>

        <SuggestionsTipsText>
          {t('financials:edit-goals.trainers-revenue')}
          <SuggestionsTipsLink>See Blog post and how</SuggestionsTipsLink>
        </SuggestionsTipsText>
      </SuggestionsTipsWrapper>
    </SuggestionsWrapper>
  )
}
export default GoalsSuggestions
