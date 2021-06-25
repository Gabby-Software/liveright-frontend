import styled from "styled-components";

export default styled.div`
    .accordion {
        &__item {
            margin-bottom: 12px;
        }
        &__header {
            ${p => p.theme.extend.flexCenter}
            color: ${p => p.theme.vars.colors.primaryDark};
        }
        &__icon  {
           margin-left: auto;
           width: 12px;
           box-sizing: content-box;
           display: block;
           transition: ${p => p.theme.vars.defaults.transition};
           transform-origin: center center;
           transform: rotate(0deg);
           &__open {
                transform: rotate(180deg);
           }
        }
        &__title {
            font-weight: 500;
            margin: 0;
        }
        &__body {
            transition: ${p => p.theme.vars.defaults.transition};
            overflow: hidden;
            height: 0;
            >div {
                padding-top: 16px;
            }
        }
    }
`;
