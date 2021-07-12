import styled from "styled-components";

export default styled.h1`
    ${p => p.theme.extend.flexCenter}
    height: calc(100vh - 100px);
    padding-bottom: 100px;
    flex-direction: column;
    h1 {
        font-weight: 600;
        font-size: 3rem;
        margin: 0;
    }
    p {
        ${p => p.theme.extend.p1}
    }
`;
