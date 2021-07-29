import styled from "styled-components";

export default styled.div`
.add-session {
    &__form {
        margin-top: 24px;
        display: flex;
        &__left {
            width: 100%;
            margin-right: 20px;
        }
        &__right {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        [class$=__wrapper] {
            margin-bottom: 12px;
        }
        &__submit {
            margin-top: 40px;
        }
        &__credits {
            margin: 12px 0;
            font-weight: 500;
            border-top: 1px solid ${p => p.theme.vars.colors.secondary2};
            border-bottom: 1px solid ${p => p.theme.vars.colors.secondary2};
            padding: 12px 0;
        }
    }

}
`;
