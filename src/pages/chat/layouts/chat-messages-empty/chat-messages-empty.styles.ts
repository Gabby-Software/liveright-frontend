import styled from 'styled-components'

export default styled.div`
  width: 100%;
  height: 100%;
  ${(p) => p.theme.extend.flexCenter};
  .messages-empty {
    ${(p) => p.theme.extend.flexCenter};
    padding: 13px 25px;
    background: #f1f4f7;
    border-radius: 8px;
    font-size: 14px;
    color: ${(p) => p.theme.vars.colors.primaryDark2_v2};
  }
`
