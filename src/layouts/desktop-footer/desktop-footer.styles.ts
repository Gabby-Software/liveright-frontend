import styled from "styled-components";

export default styled.div`
margin-top: auto;
height: 114px;
background-color: white;
position: relative;
z-index: ${p => p.theme.vars.zIndex.footer};
border-top: 1px solid ${p => p.theme.vars.colors.secondary2};
${p => p.theme.extend.flexCenter}
// width: 100vw;
.footer {
    &__basic {
        ${p => p.theme.extend.flexCenter}
        img {
            ${p => p.theme.mixin.circleImage('23px')}
            flex-shrink: 0;
            cursor: pointer;
        }
    }
    &__actions {
    
    }
}
`;
