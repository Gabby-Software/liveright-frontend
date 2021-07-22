import styled from "styled-components";

export default styled.h3`
    font-weight: 600;
    font-size: 1.5rem;
    color: ${p => p.theme.vars.colors.primaryDark};
    padding-bottom: 12px;
    border-bottom: 1px solid ${p => p.theme.vars.colors.secondary};
    margin: 64px 0 34px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid ${p => p.theme.vars.colors.secondary2};
`;
