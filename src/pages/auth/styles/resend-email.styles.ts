import styled from 'styled-components'

export default styled.div`
    display flex;
    justify-content: space-between;
    max-width: 256px;
    margin: 60px auto 20px auto;
    font-size: 18px;
    color:${(p) => p.theme.vars.colors.primaryDark};
    a {
        color: ${(p) => p.theme.vars.colors.primary};
        transition: ${(p) => p.theme.vars.defaults.transition};
        text-decoration:none;
        font-weight: 600;
        &:hover {
            color: ${(p) => p.theme.vars.colors.primaryLight};
        }
    }
`
