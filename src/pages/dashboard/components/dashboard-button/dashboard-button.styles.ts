import styled from 'styled-components'
export const ButtonStyles = styled.button`
  width: 100%;
  background: transparent;
  border: 1px solid rgba(16, 36, 61, 0.1);
  border-radius: 10px;
  padding: 10px 0 12px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: rgba(16, 36, 61, 0.6);
    font-size: 14px;
    svg {
      stroke: #707c8b;
      margin-right: 8px;
    }
  }
`
