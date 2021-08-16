import styled from "styled-components";
import Card from "../../../../../../components/card/card.style";
import {media} from "../../../../../../assets/styles/_media";

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
    ${media('tablet', 'max')`
        width: calc(50% - 6px);
        margin: 0 12px 12px 0;
        &:nth-child(even) {
            margin: 0 0 12px 0;
        }
    `}
`;
