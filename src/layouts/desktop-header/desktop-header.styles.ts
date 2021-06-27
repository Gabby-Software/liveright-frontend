import styled from "styled-components";

export default styled.header`
    ${p => p.theme.extend.flexCenter}
    display: block;
    position: sticky;
    top:0;
    width: 100%;
    padding: 40px 37px;
    display: flex;
    z-index: ${p =>p.theme.vars.zIndex.header};
    background: linear-gradient(to bottom, white 66%, transparent);
    .desktop-header {
        &__title {
            font-weight: 600;
            font-size: 1.5rem;
            margin: 0;
        }
        &__nav {
            margin-left: auto;
            display: flex;
        }
        &__menu {
            ${p => p.theme.extend.flexCenter};
            list-style: none;
            padding: 0;
            margin: 0;
        }
        &__item {
            a {
                box-shadow: 0px 0px 5px transparent;
                transition: ${p => p.theme.vars.defaults.transition};
                ${p => p.theme.extend.flexCenter};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: ${p => p.theme.vars.colors.card};
                margin-left: 15px;
                color: ${p => p.theme.vars.colors.primaryDark};
            }
            svg {
                display: block;
                height: 15px;
            }
            img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: center;
            }
            &__active {
                
                a {
                    box-shadow: 0px 0px 5px ${p => p.theme.vars.colors.primary};
                    color: ${p => p.theme.vars.colors.primary};
                }
            }
        }
        &__trainer {
        
        }
        &__profile {
            &__img {
                ${p => p.theme.mixin.circleImage('36px')}
            }
            &__info {
                margin: 0 auto 0 8px;
            }
            &__name {
                font-size: 12px;
                font-weight: 600;
                color: black;
            }
            &__type {
                font-size: 10px;
                color: ${p => p.theme.vars.colors.secondary};
            }
        }
    }
    .dropdown {
        margin-left: 36px;
        min-width: 220px;
    }
`;
