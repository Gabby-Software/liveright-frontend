import styled from "styled-components";

export default styled.div`
    background-color: ${p => p.theme.vars.colors.background};
    height: 100px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid #f5f5f5;
    box-sizing: border-box;
    display: flex;
    .mobile-footer {
        &__cont {
            display: flex;
            width: 100%;
            padding-bottom: 25px;
        }
        &__item {
            width:100%;
            color: ${p => p.theme.vars.colors.secondary2};
            ${p => p.theme.extend.flexCenter}
            text-align:center;
            cursor: pointer;
            svg {
                height:22px;
                display:block;
                margin: 0 auto .5rem auto;
            }
            &__active {
                color: ${p => p.theme.vars.colors.primaryDark}
            }
        }
        &__add {
            width: 100%;
            text-align: center;
            ${p => p.theme.extend.flexCenter}
            svg {
                cursor: pointer;
                color: white;
                height:22px;
                display:block;
                padding: 16px;
                border-radius: 50%;
                background-color: ${p => p.theme.vars.colors.primaryDark};
                box-sizing: content-box;
                margin: -31px 0 .5rem 0;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
            }
        }
    }
`;
