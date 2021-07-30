import styled from "styled-components";

export default styled.div`
    margin: 40px 0 0 0;
    color: ${p => p.theme.vars.colors.primary};
    font-weight: 500;
    cursor: pointer;
    &:hover {
        color: ${p => p.theme.vars.colors.primaryLight};
    }
`;
