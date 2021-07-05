import styled from "styled-components";
import {media} from "../../../assets/styles/_media";

export default styled.div`
    width: 100%;
    max-width: 359px;
    margin-right: 90px;
    .info {
        &__name {
            font-size: 1rem;
            color: ${p => p.theme.vars.colors.dark};
        }
        &__value {
            white-space:pre-line;
            color: ${p => p.theme.vars.colors.dark2};
            margin-top:8px;
            font-size: 1rem;
        }
    }
    @media all and (max-width: 1250px) {
        margin: 0 0 40px 0;
    }
`;
