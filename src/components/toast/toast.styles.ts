import styled from "styled-components";

export default styled.div`
    position: fixed;
    top: 15px;
    right: 0;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: ${p => p.theme.vars.zIndex.toast};
    .ant-alert {
        margin: 5px 20px;
    }
`;
