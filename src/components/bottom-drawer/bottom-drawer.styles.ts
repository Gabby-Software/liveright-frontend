import styled from "styled-components";
import {Drawer} from "antd";

export default styled(Drawer)`
.ant-drawer-body {
    padding:0;
}
.drawer {
    
    &__header {
        position: relative;
        padding: 53px 24px 16px 24px;
        border-bottom: 1px solid ${p => p.theme.vars.colors.light};
        &:before {
            ${p => p.theme.extend.pseudo}
            left:0;
            right:0;
            height: 5px;
            width: 96px;
            background-color: ${p => p.theme.vars.colors.light};
            top: 6px;
            margin: auto;
        }
    }
    &__back {
        position: absolute;
        left: 24px;
        bottom:17px;
        opacity: .5;
        height: 1rem;
        cursor: pointer;
    }
    &__title {
        font-size: 12px;
        font-weight: 500;
        margin: 0;
        text-align: center;
    }
}
`;
