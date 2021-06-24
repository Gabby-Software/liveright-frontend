import styled from "styled-components";

export default styled.div`
    display: flex;
    align-items: flex-end;
    margin: 64px 0 34px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid ${p => p.theme.vars.colors.secondary2};
    h2 {
        margin:0;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;
