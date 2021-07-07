import styled from "styled-components";
import {Pagination} from 'antd';

export default styled(Pagination)`
    margin-top: 16px;
    .ant-pagination {
        &-item, &-prev, &-next {
            ${p =>p.theme.extend.p2}
            display:inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            height: 24px;
            &-active, &:hover {
                border-color: ${p => p.theme.vars.colors.primary} !important;
                a {
                    color: ${p => p.theme.vars.colors.primary} !important;
                }
                .ant-pagination-item-link {
                    color: ${p => p.theme.vars.colors.primary} !important;
                    border-color: ${p => p.theme.vars.colors.primary} !important;                    
                }
            }
        }
    }
`;
