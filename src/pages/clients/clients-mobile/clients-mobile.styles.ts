import styled from "styled-components";

export default styled.div`

${p => p.theme.extend.layout}
.clients {
    &__heading {
    
    }
    &__card {
        margin-bottom: 12px;
        box-shadow: 1px 2px 3px ${p => p.theme.vars.colors.secondary}88; 
    }
    &__name {
        ${p =>p.theme.extend.p1}
        color: ${p =>p.theme.vars.colors.primaryDark};
    }
    &__label {
        ${p =>p.theme.extend.p1}
        color: ${p =>p.theme.vars.colors.secondary};
        margin-top: 4px;
    }
}
`;
