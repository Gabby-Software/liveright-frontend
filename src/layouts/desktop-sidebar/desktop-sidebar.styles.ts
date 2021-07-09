import styled from "styled-components";

export default styled.aside`
    display: block;
    height: 100vh;
    position: sticky;
    top:0;
    flex-shrink: 0;
    border-right: 1px solid ${p => p.theme.vars.colors.secondary2};
    transition: ${p =>p.theme.vars.defaults.transition};
    width: 60px;
    .sidebar {
        &__logo {
            ${p => p.theme.extend.flexCenter}
            padding: 53px 0 37px 0;
            
            svg {
                height: 26px;
                margin-bottom: 26px;
                width: auto;
                display: block;
                transition: ${p =>p.theme.vars.defaults.transition};
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
                font-weight: 1rem;
                transition: ${p => p.theme.vars.defaults.transition};
                overflow: hidden;
            }
            svg {
                width: 26px;
                height: auto;
                margin-right: 16px;
                display: block;
                flex-shrink:0;
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
        &__collapse {
                height: 24px;
                width: auto;
                display: block;
                margin: 20px auto 20px 20px;
                color: ${p => p.theme.vars.colors.secondary3};
                cursor: pointer;
                transition: ${p =>p.theme.vars.defaults.transition};
                &:hover {
                    color: ${p => p.theme.vars.colors.primary};
                }
        }
    }
    &.sidebar__open {
        width: 170px;
        .sidebar {
            &__collapse {
                transform: rotate(180deg);
            }
            &__logo {
                svg {
                    height: 52px;
                    margin-bottom: 0;
                }
            }
        }
        
    }
`;
