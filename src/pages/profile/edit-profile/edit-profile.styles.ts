import styled from "styled-components";

export default styled.div`
    ${p => p.theme.extend.layout}
    .text_input__wrapper, .textarea__wrapper {
        padding-bottom: 26px;
    }
    .button-submit {
        margin-top: 78px;
    }
`;
