import styled from "styled-components";
import Card from "../../../../../../components/card/card.style";

export default styled(Card)`
    text-align: center;
    margin: 0 16px 0 0;
    width: 200px;
    padding: 24px 12px;
    .total {
        &__label {
            ${p => p.theme.extend.h2}
            color: ${p => p.theme.vars.colors.primary};
        }
        &__value {
            color: ${p => p.theme.vars.colors.primaryDark};
            ${p => p.theme.extend.big}
            padding: 10px 0;
        }
        &__note {
            color: ${p => p.theme.vars.colors.secondary};
            ${p => p.theme.extend.p1}
        }
    }
`;
