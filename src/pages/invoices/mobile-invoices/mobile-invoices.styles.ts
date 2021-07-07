import styled from "styled-components";

export default styled.div`
${p => p.theme.extend.layout}
.invoices {
    &__heading {
        ${p => p.theme.extend.flexCenter}   
        margin-bottom: 24px;     
    }
    &__overall {
        ${p => p.theme.extend.flexCenter}
        flex-direction: column;
        width: 100%;
        margin-right: 8px; 
        aspect-ratio: 1;
            &__paid {
                color: ${p => p.theme.vars.colors.success};
                box-shadow: 0 0 2px ${p => p.theme.vars.colors.success};
            }
            &__cancelled {
                color: ${p => p.theme.vars.colors.secondary};
                box-shadow: 0 0 2px ${p => p.theme.vars.colors.secondary};
            }
            &__outstanding {
                color: ${p => p.theme.vars.colors.error};
                box-shadow: 0 0 2px ${p => p.theme.vars.colors.error};
            }
        &:last-child {
            margin-right:0;
        }
        &__label {
            ${p => p.theme.extend.small}
            // color: ${p => p.theme.vars.colors.primaryDark};
        }
        &__value {
            ${p => p.theme.extend.big}
        }
    }
    &__item {
        margin-bottom: 12px;
        display: block;
        color: ${p => p.theme.vars.colors.primaryDark};
        box-shadow: 1px 2px 3px ${p => p.theme.vars.colors.secondary}; 
        &__card {
            display: flex;
            justify-content: space-between;
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
