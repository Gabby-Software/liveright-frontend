import styled from "styled-components";
import {media} from "../../../assets/styles/_media";
import FormRow from "../../forms/form-row/form-row.component";

export const Row = styled(FormRow)`
  & > * {
    margin-top: 0;
  }
`

export default styled.div`
    .text_input__wrapper {
        margin-bottom: 24px;
    }
    .ant-btn-primary {
        margin-top: 48px;
    }
    .reschedule {
        &__current {
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &__label {
                
            }
            &__item {
                color: ${p => p.theme.vars.colors.primaryDark};
                font-weight: 600;
                font-size: 16px;
                display: flex;
                align-items: center; 
                svg {
                    width: auto;
                    height: 16px;
                    display: block;
                    margin-right: 10px;
                }
            }
        }
        &__warning {
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
    }
`;
