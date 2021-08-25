import styled from 'styled-components'

import Card from '../../../../components/card/card.style'
import ProfileImage from '../../../../components/profile-image/profile-image.component'

export const StyledAvatar = styled(ProfileImage)`
  .profile-image__img {
    width: 53px;
    height: 53px;
    font-size: 18px;
  }
`
export const DataItem = styled(Card)`
  margin-bottom: 5px;
  color: ${(p) => p.theme.vars.colors.dark_v2};
`
export default styled.div`
  min-width: 277px;
  flex-shrink: 0;
  margin-right: 16px;
  background-color: white;
  padding: 17px 20px;
  .chat-trainer {
    &__info {
      display: flex;
      padding: 17px 17px 21px 17px;
      &__data {
        margin-left: 14px;
      }
    }
    &__name {
      font-size: 18px;
      font-weight: 700;
    }
    &__meta {
      margin-top: 34px;
    }
    &__title {
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      display: flex;
      align-items: center;
      font-weight: 700;
      margin-bottom: 12px;
      svg {
        display: block;
        margin-right: 10px;
      }
    }
  }
`
