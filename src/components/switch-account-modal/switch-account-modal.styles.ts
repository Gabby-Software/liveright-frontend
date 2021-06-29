import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction:column;
    overflow: hidden;
    @media all and (max-width: ${p =>p.theme.vars.media.tablet}px){
        height: calc(100vh - 48px);
    }
    .swa {
        &__cont {
            width: 100%;
            height:100%;
            overflow: hidden;
        }
        &__wrapper {
            width: 200%;
            display:flex;
            transition: ${p =>p.theme.vars.defaults.transition};
            position: relative;
            will-change: transform;
        }
    }
`;
