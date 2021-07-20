import styled from "styled-components";

export default styled.div`
@media all and (max-width: ${p => p.theme.vars.media.tablet}px) {
    ${p => p.theme.extend.layout}
}
.invoices {
    &__body {
        max-width: 1300px;
       
    }
}
`;
