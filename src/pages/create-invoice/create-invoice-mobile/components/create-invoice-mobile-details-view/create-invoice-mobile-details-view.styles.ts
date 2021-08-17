import styled from "styled-components";

export default styled.div`
counter-increment: create-section;
display: flex;
flex-wrap: wrap;
padding-bottom: 12px;
border-bottom: 1px solid ${p => p.theme.vars.colors.light};
margin-bottom: 24px;
.ci-preview__details {
    width: 50%;
    color: ${p => p.theme.vars.colors.secondary3};
    font-weight: 500;
    padding-bottom: 12px;
    &__value {
        color: ${p => p.theme.vars.colors.primaryDark};
        font-weight: 600;
        padding-left: 10px;
    }
}
`;
