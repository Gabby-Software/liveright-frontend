import styled from "styled-components";

export default styled.p`
            font-size: 12px;
            color: #333333;
            font-weight: 500;
            margin-top:92px;
            margin-bottom:0;
            @media all and (max-height: 800px) {
                margin-top: 20px;
            }
            a {
                color: ${p => p.theme.vars.colors.primary};
                font-weight: 700;
            }
`;
