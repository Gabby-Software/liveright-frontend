import styled from "styled-components";

export default styled.div`
    width: 100%;
    flex-shrink:0;
    overflow: hidden;
    form {
        display:block;
        height: 100%;
        overflow: auto;
    }
    .ant-btn-primary {
        margin: 40px 0 24px 0;
    }
    [class$=input__wrapper], .switch__wrapper, .textarea__wrapper {
        margin-bottom: 24px;
    }
`;
