import styled from "styled-components";

export default styled.div`
    color: ${props => props.theme.vars.colors.primary};
    background-color: blue;
    div {
        ${props => props.theme.extend.flexCenter}
    }
`;
