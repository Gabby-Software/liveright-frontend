import styled from "styled-components";
import {media} from "../../assets/styles/_media";

export default styled.div`
    position: fixed;
    top: 15px;
    right: 0;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: ${p => p.theme.vars.zIndex.toast};
    svg {
        flex-shrink:0;
    }
    .alert {
        margin: 5px 20px;
        border-radius: 12px;
        ${p => p.theme.extend.flexCenter}
        padding: 18px;
        &__success {
            background-color: #EBF7EE;
            border: 1px solid #D2EDDA;        
        }
        &__error {
            background-color: #FCEDEA;
            border: 1px solid: #F8DCD7;
        }
        &__msg {
            padding: 0 38px 0 13px;
            font-size: 16px;
            font-weight: 500;
            display: block;
            ${media('tablet', 'max')`
                font-size: 12px;
            `}
        }
        &__close {
            color: #AFAFAF;
            width: 12px;
            height: 12px;
        }
        ${media('tablet', 'max')`
                svg:first-child {
                        width: 18px;
                        height: 18px;
                }
         `}
    }
`;
