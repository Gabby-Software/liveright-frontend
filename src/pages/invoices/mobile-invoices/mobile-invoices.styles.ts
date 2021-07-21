import styled from "styled-components";

export default styled.div`

.invoices {
    &__heading {
        ${p => p.theme.extend.flexCenter}   
        margin-bottom: 24px;     
    }
    &__item {
        margin-bottom: 12px;
        display: block;
        color: ${p => p.theme.vars.colors.primaryDark};
        box-shadow: 1px 2px 3px ${p => p.theme.vars.colors.secondary}88; 
        &__card {
            display: flex;
            justify-content: space-between;
            ${p =>p.theme.extend.p1}
        }
        &__right {
            text-align: right;
        }
        &__status {
            &.paid {
                color: ${p => p.theme.vars.colors.success};
            }
            &.outstanding {
                color: ${p => p.theme.vars.colors.error};
            }
            &.cancelled {
                color: ${p => p.theme.vars.colors.secondary};
            }
        }
    }
}
`;
