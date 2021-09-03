import styled from 'styled-components'

export default styled.div`
  display: flex;
  width: 500px;
  max-width: calc(100vw - 40px);
  flex-wrap: wrap;
  .cm-image {
    &__image {
      width: 25%;
      aspect-ratio: 1;
      object-fit: cover;
      padding: 2px;
      border-radius: 6px;
      display: block;
      cursor: pointer;
      &:nth-last-child(-n + 4) {
        padding-bottom: 4px;
      }
      &:nth-child(-n + 4) {
        padding-top: 4px;
      }
      &:first-child,
      &:nth-child(4n + 1) {
        padding-left: 4px;
      }
      &:last-child,
      &:nth-child(4n) {
        padding-right: 4px;
      }
    }
  }
  &.cm-images {
    &-1 {
      .cm-image__image {
        width: 100%;
      }
    }
    &-2 {
      .cm-image__image {
        width: 50%;
      }
    }
    &-3 {
      .cm-image__image {
        width: 33%;
      }
    }
  }
`
