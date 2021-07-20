import styled from "styled-components";

export default styled.div`
    display: flex;
    width: 100%;
    .layout {
        &__wrapper {
            width: calc(100% - 56px);
            @media all and (max-height: 800px) {
                width: calc(100% - 46px);
            }
            overflow: auto;
            padding: 0 128px 0 56px;
        }
    }
`;
