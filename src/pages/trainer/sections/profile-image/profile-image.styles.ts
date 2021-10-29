import styled from 'styled-components'

export default styled.div`
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    display: flex;
    justify-content: center;
    .image-upload__wrapper {
      margin: auto;
    }
  }
  .profile-image {
    &__img {
      ${(p) => p.theme.mixin.circleImage('114px')}
      display: flex;
      @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
        ${(p) => p.theme.mixin.circleImage('86px')}
        margin: auto;
      }
    }
    &__placeholder {
      ${(p) => p.theme.extend.flexCenter}
      border-radius: 50%;
      width: 114px;
      height: 114px;
      font-size: 36px;
      font-weight: 600;
      background-color: ${(p) => p.theme.vars.colors.primary_v2};
      color: white;
      @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
        margin: auto;
        width: 86px;
        height: 86px;
      }
    }
  }
`
