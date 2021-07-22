import styled from "styled-components";
import {Pagination} from 'antd';

export default styled(Pagination)`
    margin: 60px 0;
    padding: 32px 0;
    border-top: 1px solid ${p => p.theme.vars.colors.light};
    text-align: center;
    .ant-pagination {
        &-item, &-prev, &-next {
            ${p =>p.theme.extend.h2}
            display:inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            height: 43px;
            width: 43px;
            background-color: #f3f3f3;
            border-color: #f3f3f3;
            border-radius: 8px;
            .ant-pagination-item-link {
                background-color: #f3f3f3;
                border-color: #f3f3f3;
                border-radius: 8px;
            }
            &-active, &:hover {
                border-color: ${p => p.theme.vars.colors.primary} !important;
                background-color: ${p => p.theme.vars.colors.primary} !important;
                a {
                    color: white !important;
                }
                .ant-pagination-item-link {
                    color: white !important;
                    border-color: ${p => p.theme.vars.colors.primary} !important;
                    background-color: ${p => p.theme.vars.colors.primary} !important;
                    border-radius: 8px;                    
                }
            }
        }
    }
`;
