import { Link } from 'react-router-dom'
import styled from 'styled-components'
export default styled.div`
  color: ${(p) => p.theme.vars.colors.primaryDark};
  @media all and (min-width: ${(p) => p.theme.vars.media.desktop}px) {
    width: 320px;
    max-width: 50%;
    height: 100vh;
    position: sticky;
    top: 0;
    padding: 45px 45px;
    flex-shrink: 0;
    border-right: 1px solid ${(p) => p.theme.vars.colors.inputBorder};
  }
  @media all and (max-width: ${(p) => p.theme.vars.media.desktop - 1}px) {
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sidebar {
    &__logo {
      width: auto;
      height: 100px;
      margin: 0;
      display: block;
    }
    &__body {
      padding: 45px 0 0 0;
    }
  }
  @media all and (max-height: 800px) {
    padding: 24px 45px 108px 45px;
    .sidebar {
      &__logo {
        height: 80px;
        margin-bottom: 24px;
      }
    }
  }
`
export const PTitle = styled.h1`
  color: ${(p) => p.theme.vars.colors.primaryDark};
  font-size: 36px;
  font-weight: 600;
  margin: 0;
  @media all and (max-width: ${(p) => p.theme.vars.media.desktop - 1}px) {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0 0 5px 0;
  }
`
export const PLink = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.vars.colors.primaryDark};
  text-decoration: none;
  &:hover {
    color: white;
  }
`
export const PExtLink = styled.a`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.vars.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(p) => p.theme.vars.colors.primary};
  }
  svg {
    margin-right: 12px;
    height: 14px;
    width: auto;
  }
`
export const PDesc = styled.div`
  color: ${(p) => p.theme.vars.colors.primaryDark};
  font-size: 20px;
  font-weight: 500;
`
export const PSubtitle = styled.div`
  color: ${(p) => p.theme.vars.colors.secondary3};
  font-size: 18px;
  font-weight: 500;
`
export const PHr = styled.div`
  margin: 40px 0;
  border-bottom: 1px solid ${(p) => p.theme.vars.colors.secondary2};
  max-width: 50px;
  @media all and (max-width: ${(p) => p.theme.vars.media.desktop - 1}px) {
    margin: 40px auto;
  }
`
export const PSpace = styled.div`
  margin-top: 40px;
`
