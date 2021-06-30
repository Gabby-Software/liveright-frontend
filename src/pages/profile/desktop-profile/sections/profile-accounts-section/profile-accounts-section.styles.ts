import styled from "styled-components";

export default styled.section`
    .accounts {
        &__cont {
            display: flex;
            flex-wrap: wrap;
        }
        &__add {
            cursor: pointer;
            height: 70px;
            background-color: ${p =>p.theme.vars.colors.card};
            width: 247px;
            border-radius:${p =>p.theme.vars.sizes.borderRadius};
            ${p => p.theme.mixin.dashedBorder(p.theme.vars.colors.secondary2)}
            ${p => p.theme.extend.flexCenter}
            font-weight: 500;
            font-size: 14px;
            color: ${p => p.theme.vars.colors.labelLight};
            svg {
                color: ${p => p.theme.vars.colors.secondary2};
            }
        }
    }
`;
