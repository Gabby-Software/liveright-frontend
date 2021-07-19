import styled from "styled-components";

const PageTitle = styled.h1`
    font-weight: 600;
    font-size: 24px;
    color: ${p => p.theme.vars.colors.dark2};
    margin: 31px 0 71px 0;
    padding: 0 0 26px 0;
    border-bottom: 1px solid ${p => p.theme.vars.colors.inputBorder};
    // max-width: 1184px;
`;

export default PageTitle;
