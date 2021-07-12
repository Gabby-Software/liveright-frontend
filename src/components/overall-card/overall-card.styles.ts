import styled from "styled-components";
import Card from "../card/card.style";

export const ContStyles = styled.div`
    display: flex;
    margin-bottom: 24px;
`;
export const CardStyles = styled(Card)`
${p => p.theme.extend.flexCenter}
flex-direction: column;
width: 100%;
margin-right: 8px; 
aspect-ratio: 1;
&:last-child {
    margin-right:0;
}
&.overall {
            &__paid, &__success {
                color: ${p => p.theme.vars.colors.success};
                box-shadow: 0 0 2px ${p => p.theme.vars.colors.success}88;
            }
            &__cancelled, &__secondary, &__default {
                color: ${p => p.theme.vars.colors.secondary};
                box-shadow: 0 0 2px ${p => p.theme.vars.colors.secondary}88;
            }
            &__outstanding, &__error {
                color: ${p => p.theme.vars.colors.error};
                box-shadow: 0 0 2px ${p => p.theme.vars.colors.error}88;
            }
}
.overall {
        &__label {
            ${p => p.theme.extend.small}
        }
        &__value {
            ${p => p.theme.extend.big}
        }
    }
`;
