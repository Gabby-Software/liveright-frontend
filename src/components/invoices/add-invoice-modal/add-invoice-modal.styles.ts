import styled from 'styled-components'

export default styled.div`
  margin-top: 80px;
  .ant-btn {
    margin-top: 40px;
  }
  [class$='input__wrapper'] {
    margin-bottom: 14px;
  }
  .add-invoice__title {
    ${(p) => p.theme.extend.h1};
    margin-bottom: 40px;
    color: ${(p) => p.theme.vars.colors.primaryDark};
  }
`
