import styled from "styled-components";
import {media} from "../../../assets/styles/_media";

export default styled.div`

    .text_input__wrapper, .select_input__wrapper {
        margin-bottom: 24px;
    }
    .ant-btn-primary {
        margin-top: 40px;
    }
  
  
    .reschedule-warning {
        color: ${p => p.theme.vars.colors.primaryDark};
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        a {
            font-weight: 600;
            color: ${p => p.theme.vars.colors.primary};
            transition: ${p =>p.theme.vars.defaults.transition};
            margin-left: 10px;
            ${media('tablet', 'max')`
                display: block;
                margin-left:0;
                margin-top: 4px;
            `}
            &:hover {
                color: ${p => p.theme.vars.colors.primaryLight};
            }
        }
    }
`;
