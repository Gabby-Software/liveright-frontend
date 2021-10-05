import { FC } from 'react'

import { HelpIcon } from '../../../../assets/media/icons'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import {
  SuggestionsHead,
  SuggestionsTipsLink,
  SuggestionsTipsText,
  SuggestionsTipsWrapper,
  SuggestionsWrapper
} from './edit-goals-suggestions.styles'

interface EditGoalsSuggestionsProps {}

const EditGoalsSummary: FC<EditGoalsSuggestionsProps> = () => {
  const { t } = useTranslation()
  return (
    <SuggestionsWrapper>
      <SuggestionsHead>
        {t('financials:edit-goals.suggestions-title')}
      </SuggestionsHead>
      <SuggestionsTipsWrapper>
        <SuggestionsTipsText>
          <HelpIcon />
          {t('financials:edit-goals.increase-revenue')}
          <SuggestionsTipsLink>See tips</SuggestionsTipsLink>
        </SuggestionsTipsText>

        <SuggestionsTipsText>
          <HelpIcon />
          {t('financials:edit-goals.trainers-revenue')}
          <SuggestionsTipsLink>See tips</SuggestionsTipsLink>
        </SuggestionsTipsText>
      </SuggestionsTipsWrapper>
    </SuggestionsWrapper>
  )
}
export default EditGoalsSummary
