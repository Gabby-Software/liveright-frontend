import styled from "styled-components";

export default styled.div`
.mobile-layout {
    &__main {
        display: block;
        ${p => p.theme.extend.layout}
    }
    &__title {
        color: ${p => p.theme.vars.colors.primaryDark};
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 24px 0;   
    }
}
`;
