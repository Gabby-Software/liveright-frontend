import styled from 'styled-components'

export default styled.div`
  .image-upload {
    &__wrapper {
      position: relative;
      width: fit-content;
    }
    &__input {
      display: none;
    }
    &__label {
      cursor: pointer;
      color: ${(p) => p.theme.vars.colors.primary};
      font-weight: 600;
      font-size: 14px;
      width: fit-content;
      margin: 22px auto;
    }
  }
`
