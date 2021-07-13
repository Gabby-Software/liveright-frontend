import styled from "styled-components";

export default styled.div`
    padding: 40px;
    display: flex;
    overflow: auto;
    .select_input__wrapper {
        max-width: 260px;
    }
    .sessions {
        &__data {
            width: 100%;
            max-width: 920px;
            margin:auto;
        }
        &__activities {
            max-width:0;
            overflow: hidden;
            white-space: nowrap;
            transition: all .5s ease;
        }
    }
    .data-table__tr {
        &:hover {
            .sessions__activities {
                max-width: 100%;
            }
        }
    }
`;
