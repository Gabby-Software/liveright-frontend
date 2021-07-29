import styled from "styled-components";

export default styled.div`
.add-session {
    &__empty {
        &__icon {
            width: 80px;
            height: auto;
            display: block;
            margin: 24px 0;
            color: ${p =>p.theme.vars.colors.secondary3}
        }
        &__desc {
            ${p => p.theme.extend.p1}
            font-style: italic;
        }
    }
}
`;
