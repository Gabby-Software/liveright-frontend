import styled from "styled-components";

export default styled.div`
.add-session {
    &__for {
        margin: 24px 0;
    }
    &__form {
        [class$=__wrapper] {
            margin-bottom: 12px;
        }
        &__submit {
            margin-top: 40px;
        }
        &__credits {
            margin: 40px 0 12px 0;
            font-weight: 500;
            border-top: 1px solid ${p => p.theme.vars.colors.secondary2};
            border-bottom: 1px solid ${p => p.theme.vars.colors.secondary2};
            padding: 12px 0;
        }
    }
    &__calendar {
        &__open {
            position: relative;
            margin: 40px 0;
        }
        &__close {
            ${p => p.theme.extend.p1}
            display: flex;
            align-items: center;
            cursor: pointer;
            margin: 40px 0;
            svg {
                width: 16px;
                height: auto;
                margin-right: 12px;
            }
        }
        &__times {
            position: absolute;
            top: 7px;
            right: 0;
            width: 16px;
            height: auto;
        }
    }
}
`;
