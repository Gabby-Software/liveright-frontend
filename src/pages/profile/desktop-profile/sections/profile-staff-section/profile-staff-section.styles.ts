import styled from "styled-components";

export default styled.div`
.staff {
        margin-bottom:16px;
        margin-right: 16px;
        width:300px;
        max-width: calc(50% - 8px);
        &:last-child {
            margin-right: 0;
        }
        &__cont {
            display: flex;
        }
        &__heading {
            ${p =>p.theme.extend.flexCenter};
            margin-bottom:10px;
            svg {
                display:block;
                width:18px;
                margin-right: 10px;
            }
        }
        &__title {
            margin:0 auto 0 0;
            color:${p=>p.theme.vars.colors.primaryDark};
            font-weight: 500;
        }
        &__body {
            font-weight: 500;
            color: ${p =>p.theme.vars.colors.secondary3};
        }
    }
`;
