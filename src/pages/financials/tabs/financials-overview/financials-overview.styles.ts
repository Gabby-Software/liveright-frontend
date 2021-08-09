import styled from "styled-components";

export default styled.div`

.f-overview {

    &__range {
        max-width: 240px;
    }
    &__graph {
        max-width: 920px;
        margin: 40px 0;
        display: flex;
        padding: 24px;
        &__left {
            width: 100%;
            padding-right: 24px;
        }
        &__right {
            flex-shrink:0;
        }
        &__title {
            ${p => p.theme.extend.h1};
        }
        &__body {
            aspect-ratio: 3/2;
            background-color: white;
            border-radius: ${p => p.theme.vars.sizes.borderRadius};
            padding: 24px;
            margin-top: 24px;
        }
    }
}
`;