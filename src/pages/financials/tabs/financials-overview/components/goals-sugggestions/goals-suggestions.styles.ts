import styled from 'styled-components'

import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const SuggestionsWrapper = styled.div`
  background: #ffffff;
  border-radius: 10px;
  min-height: 194px;
  margin-top: 20px;
  margin-bottom: 3rem;
`

export const SuggestionsHead = styled.div`
  padding: 20px 0 20px 28px;
  height: 69px;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.444;
  background-color: #2e2f31;
  border-radius: 10px 10px 0 0;
  color: ${getColorCarry('white')};
`

export const SuggestionsTipsWrapper = styled.div`
  padding: 27px 0 36px 28px;
  & svg {
    margin-right: 10px;
  }
  @media ${mediaQueries.MOBILE} {
    padding: 20px 23px 36px 23px;
  }
`

export const SuggestionsTipsText = styled.p`
  display: flex;
  &:first-child {
    margin-bottom: 22px;
  }
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;

  @media ${mediaQueries.MOBILE} {
    flex-wrap: wrap;
  }
`

export const SuggestionsTipsLink = styled.a`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: #e49a0a;
  text-decoration: underline;
  &:hover {
    color: #e49a0a;
    text-decoration: underline;
  }
  margin-left: 20px;

  @media ${mediaQueries.MOBILE} {
    color: ${getColorCarry('link')};
    &:hover {
      color: #${getColorCarry('link')};
    }
  }
`
