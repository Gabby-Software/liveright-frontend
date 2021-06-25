import styled from "styled-components";

export default styled.section`
    display: block;
    .profile-data {
        &__dates {
            margin: 34px 0 16px 0;
        }
        &__date {
            color: ${p => p.theme.vars.colors.secondary3};
            margin-bottom: 3px;
        }
        &__value {
            display: flex;
            align-items: center;
            margin: 8px 0;
            color: ${p => p.theme.vars.colors.primaryDark};
            svg {
                display: block;
                margin-right: 16px;
            }
        }
    }
`;
