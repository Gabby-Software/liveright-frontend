import styled from 'styled-components'

export default styled.div`
  .profile-tnb {
    &__view {
      ${(p) => p.theme.extend.flexCenter}
      font-size: 1rem;
      color: ${(p) => p.theme.vars.colors.secondary3};
      justify-content: flex-start;
      svg {
        cursor: pointer;
        width: 16px;
        height: 16px;
        margin-left: 8px;
        color: ${(p) => p.theme.vars.colors.secondary};
        transition: ${(p) => p.theme.vars.defaults.transition};
        &:hover {
          color: ${(p) => p.theme.vars.colors.primaryDark};
        }
      }
    }
  }
`
