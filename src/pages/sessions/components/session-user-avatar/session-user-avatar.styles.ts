import styled from 'styled-components'

import ProfileImage from '../../../../components/profile-image/profile-image.component'

export const ProfileImageStyled = styled(ProfileImage)`
  display: inline-block;
  margin-right: 8px;
  .profile-image__img {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  .profile-image__placeholder {
    width: 28px;
    height: 28px;
    font-size: 12px;
    font-weight: 500;
    background-color: ${(p) => p.theme.vars.colors.primary};
    color: white;
  }
`

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
