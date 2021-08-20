import styled from 'styled-components'

import ProfileImage from '../../../../components/profile-image/profile-image.component'

export const ProfileImageStyled = styled(ProfileImage)`
  display: inline-block;
  margin-right: 0.75rem;

  .profile-image__img {
    width: 36px;
    height: 36px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.vars.colors.primary_v2};
    color: white;

    & span {
      line-height: 1.5;
    }
  }
`

export const Text = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.vars.colors.primaryDark_v2};
`

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
