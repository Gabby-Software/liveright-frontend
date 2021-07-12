import styled from "styled-components";

export default styled.div`
    width: 50%;
    margin: 70px 0 0 0;
    @media all and (max-width: ${p =>p.theme.vars.media.tablet}px){
        margin: 70px 0;
    }
    .add-account {
        &__type {
            ${p => p.theme.extend.flexCenter}
            margin-bottom: 14px;
            font-size:18px;
            font-weight: 500;
            height: 75px;   
            cursor:pointer;
            transition: ${p => p.theme.vars.defaults.transition};
            &:hover {
                background-color: ${p => p.theme.vars.colors.inputBorder};
            }
            &__disabled {
                color: ${p => p.theme.vars.colors.light};
                cursor: not-allowed; 
                &:hover {
                    background-color: ${p => p.theme.vars.colors.card};
                }
            }
        }
    }
`;
