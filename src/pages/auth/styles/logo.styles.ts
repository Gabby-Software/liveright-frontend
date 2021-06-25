import styled from "styled-components";

export default styled.img`
        width: 106px;
        margin: 45px 0 38px 0;
        @media all and (max-height: 800px) {
            width: 106px;
            margin: 22px 0 44px 0;
        }
        @media all and (min-width: ${p =>p.theme.vars.media.tablet}px) {
            margin-top: 25px;
        }
`;
