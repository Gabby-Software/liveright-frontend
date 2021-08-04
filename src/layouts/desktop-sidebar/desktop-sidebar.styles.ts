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
    width: 72px;
    @media only print {
        display: none;
    }
    @media all and (max-height: 800px) {
        width: 46px;
    }
    .sidebar {
        &__logo {
            ${p => p.theme.extend.flexCenter}
            padding: 37px 0 17px 0;
            
            svg {
                width: 40px;
                height: auto;
                display: block;
                transition: ${p =>p.theme.vars.defaults.transition};
                @media all and (max-height: 800px) {
                    width: 30px;
                }
            }
            @media all and (max-height: 800px) {
                padding: 37px 0 18px 0;
            }
        }
        &__nav-spacer {
            height: 100px;
            flex-shrink: 10;
        }
        &__nav {
            display: block;
            overflow: auto;
            flex-shrink:0;
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
            margin: 0 0 22px 0;
            ${p => p.theme.extend.flexCenter}
                @media all and (max-height: 800px) {
                    margin: 0 0 12px 0;
                }            
            a {
                ${p => p.theme.extend.flexCenter};
                justify-content: flex-start;
                color: ${p => p.theme.vars.colors.light2};
                margin: 0 8px;
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
                display: block;
                flex-shrink:0;
                border-radius: ${p=>p.theme.vars.sizes.borderRadius};
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
                a svg {
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
            @media all and (max-height: 800px) {
                margin: 20px 16px;
            }
        }
        &__trainer {
            ${p => p.theme.extend.flexCenter}
            flex-direction: column;
            margin: 0 16px;
            img, &__placeholder {
                ${p => p.theme.mixin.circleImage('23px')}
                ${p => p.theme.extend.flexCenter}
                font-size: 10px;
                color: white;
                background-color: ${p => p.theme.vars.colors.primary};
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
