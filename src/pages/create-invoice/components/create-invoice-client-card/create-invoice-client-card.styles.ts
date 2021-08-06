import styled from "styled-components";
import Card from "../../../../components/card/card.style";

export default styled(Card)`
position: relative;
width: auto;
${p => p.theme.extend.flexCenter}
.ci-cc {
    &__times {
        position: absolute;
        top: 0;
        right: -24px;
        font-size: 24px;
        color: ${p => p.theme.vars.colors.error};
        cursor: pointer;
    }
    &__img {
        ${p => p.theme.mixin.circleImage('40px')}
        ${p => p.theme.extend.flexCenter}
        background-color: ${p => p.theme.vars.colors.primary};
        color: white;
        font-size: 16px;
        font-weight: 500;
        margin-right: 16px;
    }
    &__name {
        font-size: 16px;
        font-weight: 500px;
        color: ${p => p.theme.vars.colors.primaryDark};
    }
    &__email {
        font-size: 12px;
        color: ${p => p.theme.vars.colors.secondary};
    }
}
`;
