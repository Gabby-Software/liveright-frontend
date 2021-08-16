import styled from "styled-components";

const margin = 20;
const padding = 30;
export default styled.div`
    width: calc(50% - ${margin/2}px);
    height: calc(50% - ${margin/2}px);
    background-color: ${p => p.theme.vars.colors.card};
    border-radius: ${p => p.theme.vars.sizes.borderRadius};
    padding: ${padding}px;
    color: ${p => p.theme.vars.colors.secondary};
    svg {
        width: 100%;
        height: 100%;
    }
    &:active {
        color: ${p => p.theme.vars.colors.primaryDark};        
    }
    &:nth-child(odd) {
        margin-right: ${margin}px;
    }
    &:nth-child(n+3) {
        margin-top: ${margin}px;
    }
`;
