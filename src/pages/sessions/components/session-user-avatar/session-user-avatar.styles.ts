import styled from 'styled-components'

import ProfileImage from '../../../../components/profile-image/profile-image.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const ProfileImageStyled = styled(ProfileImage)<any>`
  display: inline-block;
  margin-right: 0.75rem;

  .profile-image__img {
    width: ${getSize};
    height: ${getSize};
    font-size: ${getFontSize};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${getColorCarry('primary_v2')};
    color: white;

    & span {
      line-height: 1.5;
    }
  }
`

function getSize(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '24px'
    default:
      return '36px'
  }
}

function getFontSize(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '0.625rem'
    default:
      return '0.75rem'
  }
}

export const Text = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.vars.colors.primaryDark_v2};
`

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
