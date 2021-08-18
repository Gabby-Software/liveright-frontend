import styled from "styled-components";

export default styled.span`
    font-size:10px;
    color: ${p => p.theme.vars.colors.error};
    margin-top: 4px;
    display: block;
    text-align: left;
    position: absolute;
`;
