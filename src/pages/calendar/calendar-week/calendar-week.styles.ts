import styled from 'styled-components'

export default styled.div`
.calendar-week {
    display: flex;
    margin: 0 24px; 
    &__activities {
        margin: 0 28px;
        h2 {
            ${(p) => p.theme.extend.subtitle}
            margin: 24px 0 28px 0;
        }
    }
    &__activity {
        ${(p) => p.theme.extend.flexCenter}
        justify-content: space-between;
        font-weight: 500;
        font-size: 14px;
        color: ${(p) => p.theme.vars.colors.dark};
        margin-bottom: 14px;
        max-width: 400px;
        margin-right: auto;
    }
`
