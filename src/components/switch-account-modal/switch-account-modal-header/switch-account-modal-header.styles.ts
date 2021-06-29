import styled from "styled-components";

export default styled.div`
    @media all and (min-width:${p => p.theme.vars.media.tablet}px){
        display: none;
    }
    .swa-header {
        &__img {
            display: block;
            max-width: 150px;
            margin: 110px auto 55px auto;
        }
        &__title {
            ${p =>p.theme.extend.title}
        }
    }
`;
