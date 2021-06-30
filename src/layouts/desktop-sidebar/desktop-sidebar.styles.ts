import styled from "styled-components";

export default styled.aside`
    display: block;
    width: 170px;
    height: 100vh;
    position: sticky;
    top:0;
    flex-shrink: 0;
    border-right: 1px solid ${p => p.theme.vars.colors.light2};
    .sidebar {
        &__logo {
            ${p => p.theme.extend.flexCenter}
            padding: 37px 0;
            
            img {
                height: 75px;
                display: block;
            }
        }
        &__nav {
            display: block;
            margin-top: 34px;
        }
        &__menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        &__item {
            position: relative;
            a {
                ${p => p.theme.extend.flexCenter};
                justify-content: flex-start;
                color: ${p => p.theme.vars.colors.secondary3};
                padding: 18px;
                font-weight: 500;
                transition: ${p => p.theme.vars.defaults.transition};
            }
            svg {
                width: 26px;
                margin-right: 16px;
                display: block;
            }
            &__label {
                
            }
            &:before {
                ${p => p.theme.extend.pseudo};
                right:0;
                top:0;
                bottom: 0;
                width: 2px;
                height:0;
                margin: auto;
                background-color: ${p =>p.theme.vars.colors.primary};
                transition: ${p => p.theme.vars.defaults.transition};
            }
            &:hover, &__active {
                a {
                    color: ${p => p.theme.vars.colors.primary};
                }
                &:before {
                    height:60%;
                }
            }
        }
    }
`;
