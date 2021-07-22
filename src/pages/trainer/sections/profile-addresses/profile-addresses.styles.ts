import styled from "styled-components";

export default styled.div`

.profile-addr {
    &__add {
        color: ${p => p.theme.vars.colors.primary};
        font-size: 10px;
        font-weight: 500;
        text-decoration: underline;
        cursor: pointer;
    }
    &__default {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        cursor: pointer;
        ${p => p.theme.extend.radioCircle}
    }
    &__remove {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 12px;
        color: ${p => p.theme.vars.colors.error};
        font-size: 10px;
        font-weight: 500;
        cursor: pointer;
    }
}
`;
