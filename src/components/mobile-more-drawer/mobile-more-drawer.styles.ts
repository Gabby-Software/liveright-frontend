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
                font-weight: 500;
                font-size: 14px;
                ${p => p.theme.extend.flexCenter}
                color: ${p => p.theme.vars.colors.primaryDark};
            }
            svg {
                display: block;
                margin-right:20px;
                height: 22px;
            }
            &:last-child {
                padding-bottom: 60px;
            }
        }
        &__label {
            margin-right: auto;
        }
    }
`;
