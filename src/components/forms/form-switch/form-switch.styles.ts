import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  .switch {
    display: flex;
    position: relative;
    &__cont {
      padding: 3px;
      border: 2px solid ${(props) => props.theme.vars.colors.light};
      color: ${(props) => props.theme.vars.colors.secondary};
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
    }
    &__activon {
      background-color: ${(props) => props.theme.vars.colors.primary_v2};
      position: absolute;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      top: 0;
      height: 100%;
      transition: ${(p) => p.theme.vars.defaults.transition};
    }
    &__item {
      transition: ${(p) => p.theme.vars.defaults.transition};
      ${(p) => p.theme.extend.flexCenter}
      cursor: pointer;
      position: relative;
      z-index: 1;
      font-family: ${(p) => p.theme.vars.defaults.font};
      letter-spacing: 0.8px;
      font-weight: 600;
      font-size: 14px;
      width: 100%;
      padding: 11px;
      border: gray;
      margin: 3px;
      background-color: transparent;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      text-align: center;
      &__active {
        color: white;
      }
    }
  }
`
