import styled from "styled-components";

export default styled.nav`
    display: block;
    .more {
        &__menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        &__item {
            border-bottom: 1px solid ${p => p.theme.vars.colors.light2};
            a {
                padding: 17px 30px;
                ${p => p.theme.extend.flexCenter}
                color: ${p => p.theme.vars.colors.primaryDark};
            }
            svg {
                display: block;
                margin-right:20px;
                height: 22px;
            }
        }
        &__label {
            margin-right: auto;
        }
    }
`;
