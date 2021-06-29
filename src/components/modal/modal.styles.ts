import styled from "styled-components";
import {Modal} from 'antd';

export default styled(Modal)`
    .ant-modal {
        &-close {
            right: auto;
            left: 0;
            top: 24px;
            padding: 12px;
            svg {
                width: 18px;
                height: 18px;
                color: ${p =>p.theme.vars.colors.primaryDark};
            }
        }
    }
    @media all and (max-width: ${p=>p.theme.vars.media.tablet}px) {
        top:0;
        padding-bottom:0;
        width: 100% !important;
        max-width: 100%;
        margin: 0;
        .ant-modal {
            &-content {
                height: 100vh;
            }
        }
    }
`;
