import styled from "styled-components";

export default styled.div`
padding: 20px 0;
    border-bottom: 1px solid ${p => p.theme.vars.colors.light};
.create-invoice {
    
    &__section-title {
        counter-increment: create-section;
        margin-bottom: 40px;
        &:before {
            content: counter(create-section)". ";
        }
    }
}
`;
