import styled from 'styled-components'

export default styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
  color: ${(p) => p.theme.vars.colors.secondary3};
  margin: 6px 3px;
  cursor: pointer;
  transition: ${(p) => p.theme.vars.defaults.transition};
  text-align: center;
  line-height: 2.7rem;
  &:hover {
    background-color: ${(p) => p.theme.vars.colors.light};
  }
`
/* 
    padding: 10px;
    background-color: ${(p) => p.theme.vars.colors.card};
     */
