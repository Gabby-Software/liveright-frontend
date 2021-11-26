import styled from 'styled-components'

export const Styles = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(228, 154, 10, 0.05);
  border: 1px solid #e49a0a;
  padding: 1.25rem 1.875rem;
  border-radius: 10px;
  color: #10243d;
  margin-bottom: 1.25rem;

  .Alert {
    &__body {
      display: flex;
      align-items: center;
    }

    &__icon {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e49a0a;
      border-radius: 9999px;
      color: #fff;
      margin-right: 1.25rem;
    }

    &__action {
      background-color: transparent;
      border: 0;
      text-decoration: underline;
      color: #e49a0a;
      cursor: pointer;
      margin: 0 0.25rem;
    }
  }
`
