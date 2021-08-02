import styled from "styled-components";

export default styled.div`
    display: flex;
    overflow: auto;
    .clients {
        &__cont {
            max-width: 1500px;
            width: 100%;
            margin: auto;
        }
        &__activities {
            max-width: 0;
            overflow: hidden;
            white-space: nowrap;
            transition: ${p => p.theme.vars.defaults.transition};
        }
    }
    .data-table__tr {
        &:hover {
            .clients__activities {
                max-width: 100%;
            }
        }
    }
`;
