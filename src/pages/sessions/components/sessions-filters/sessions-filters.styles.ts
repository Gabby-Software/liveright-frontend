import styled, { css } from 'styled-components'

const rowStyles = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .text_input__wrapper {
    width: 500px;
    margin-right: 16px;
    margin-bottom: 0;
  }
  .ant-select {
    max-width: 200px;
  }
`

export default styled.div<{ row: boolean }>`
  margin-bottom: 16px;

  .text_input__wrapper {
    margin-bottom: 16px;
  }
  ${({ row }) => (row ? rowStyles : '')}
`
