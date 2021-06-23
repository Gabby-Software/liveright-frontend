import styled from "styled-components";

export default styled.div`
    color: red;
    .log-drawer {
        &__wrapper {
        
        }
        &__cont {
            padding: 32px 24px 105px 24px;
            ${p => p.theme.extend.flexCenter}
            flex-wrap: wrap;
        }
        &__button {
            width: 104px;
            height: 95px;
            margin: 18px 9px;
            ${p => p.theme.extend.flexCenter}
            background-color: ${p => p.theme.vars.colors.background};
            color: ${p => p.theme.vars.colors.primaryDark};
            transition:${p => p.theme.vars.defaults.transition};
            &:hover {
                background-color: ${p => p.theme.vars.colors.secondary};
            }
            svg {
                display: block;
                margin: 0 auto 13px auto;
            }
        }
        &__label {
        
        }
    }
`;
