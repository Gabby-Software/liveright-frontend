import styled from "styled-components";

export default styled.div`
    .staff {
        margin-bottom:16px;
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
        a {
            color: ${p => p.theme.vars.colors.primaryDark};
            display: block;
        }
    }
`;
