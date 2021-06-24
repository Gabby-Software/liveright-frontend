import styled from "styled-components";

export default styled.main`
    display: block;
    .profile {
        &__wrapper {
            border: 1px solid ${p => p.theme.vars.colors.light};
            margin: 15px 55px 55px 55px;
            padding: 64px 72px;
        }
    }
`;
