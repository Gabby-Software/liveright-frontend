import styled from "styled-components";

export default styled.div`
.mobile-layout__main {
    display: block;
    ${p => p.theme.extend.layout}
}
`;
