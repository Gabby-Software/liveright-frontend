import styled from 'styled-components'

export default styled.div<{ labeled: boolean }>`
  background-color: ${(p) => p.theme.vars.colors.primaryDark_v2};
  color: white;
  border-radius: 10px;
  padding: 10px 21px;
  text-align: ${({ labeled }) => (labeled ? 'left' : 'center')};
  font-size: 18px;
  margin-bottom: 20px;
  .qa-title {
    &__label {
      color: ${(p) => p.theme.vars.colors.link};
      font-size: 14px;
    }
  }
`
