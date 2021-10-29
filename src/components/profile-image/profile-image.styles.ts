import styled from 'styled-components'

export default styled.div`
  .profile-image {
    &__img {
      ${(p) => p.theme.mixin.circleImage('114px')}
      display: block;
      ${(p) => p.theme.extend.flexCenter}
      border-radius: 50%;
      width: 114px;
      height: 114px;
      font-size: 36px;
      font-weight: 600;
      background-color: ${(p) => p.theme.vars.colors.primary_v2};
      color: white;
      @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
        ${(p) => p.theme.mixin.circleImage('86px')}
        display: flex;
        margin: auto;
      }
    }
  }
`
