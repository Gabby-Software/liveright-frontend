import styled from "styled-components";

export default styled.aside`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    z-index: ${p => p.theme.vars.zIndex.footer};
    top:0;
    flex-shrink: 0;
    border-right: 1px solid ${p => p.theme.vars.colors.secondary2};
    transition: ${p =>p.theme.vars.defaults.transition};
    width: 56px;
    @media all and (max-height: 800px) {
        width: 46px;
    }
    .sidebar {
        &__logo {
            ${p => p.theme.extend.flexCenter}
            padding: 37px 0 37px 0;
            
            svg {
                width: 40px;
                margin-bottom: 26px;
                height: auto;
                display: block;
                transition: ${p =>p.theme.vars.defaults.transition};
                @media all and (max-height: 800px) {
                    width: 30px;
                    margin-bottom: 18px;
                }
            }
            @media all and (max-height: 800px) {
                padding: 37px 0 18px 0;
            }
        }
        &__nav {
            display: block;
            margin-top: 34px;
            @media all and (max-height: 800px) {
                margin-top:0;
            }
        }
        &__menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        &__item {
            position: relative;
            margin: 8px 0;
            a {
                ${p => p.theme.extend.flexCenter};
                justify-content: flex-start;
                color: ${p => p.theme.vars.colors.secondary3};
                margin: 0 8px;
                border-radius: ${p=>p.theme.vars.sizes.borderRadius};
                font-weight: 500;
                font-weight: 1rem;
                transition: ${p => p.theme.vars.defaults.transition};
                overflow: hidden;
                @media all and (max-height: 800px) {
                    padding: 4px;
                }
            }
            svg {
                width: 40px;
                height: 40px;
                padding: 12px;
                margin-right: 16px;
                display: block;
                flex-shrink:0;
                @media all and (max-height: 800px) {
                    width: 20px;
                    height: 20px;
                    padding: 4px;
                }
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
                    background-color: ${p=> p.theme.vars.colors.primary}18;
                }
                &:before {
                    // height:60%;
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
        &__hr {
            margin: 31px 16px;
            border-bottom: 1px solid ${p => p.theme.vars.colors.light2};
        }
        &__trainer {
            ${p => p.theme.extend.flexCenter}
            flex-direction: column;
            margin: 0 16px;
            img {
                ${p => p.theme.mixin.circleImage('23px')}
            }
            span {
                color: ${p => p.theme.vars.colors.light2};
                font-size: 12px;
                font-weight: 600;
                @media all and (max-height: 800px) {
                    font-weight: normal;
                    font-size: 10px;
                }
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
            &__item {
                a {
                    margin: 0 0 0 15px;
                    border-radius: ${p=>p.theme.vars.sizes.borderRadius} 0 0 ${p=>p.theme.vars.sizes.borderRadius};
                }
            }
        }
        
    }
`;
