import styled from "styled-components";

export default styled.table`
    width: 100%;
    .data-table {
        &__head {
            background-color: ${p => p.theme.vars.colors.light};
            border: 1px solid #DFDFE1;
        }
        &__th {
            text-align: left;
            padding: 16px 30px;
            ${p =>p.theme.extend.p2};
        }
        &__tr {
            border: 1px solid #F0EEF0;
            transition: ${p => p.theme.vars.defaults.transition};
            background-color: white;
            &__clickable {
                cursor: pointer;
                &:hover {
                    background-color: ${p => p.theme.vars.colors.light};
                }
            }
            &__active {
                background-color: ${p => p.theme.vars.colors.light};
            }
        }
        &__td {
            padding: 16px 30px;
            color: ${p => p.theme.vars.colors.secondary3};
            ${p => p.theme.extend.p2}
        }
    }
`;
