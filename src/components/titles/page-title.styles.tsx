import styled from "styled-components";
import {FC, HTMLProps} from "react";
import {useDesignVersion} from "../../hooks/design-version.hook";

const PageTitleStyles = styled.h1`
    display: flex;
    font-weight: 600;
    font-size: 24px;
    color: ${p => p.theme.vars.colors.dark2};
    margin: 31px 0 71px 0;
    padding: 0 0 26px 0;
    border-bottom: 1px solid ${p => p.theme.vars.colors.inputBorder};
    
    &.design-v {
        &__2 {
            font-weight: 700;
            font-size: 2rem;
            color: ${p => p.theme.vars.colors.primaryDark_v2};
            margin: 40px 0 29px 0;
            padding:0;
            border-bottom: none;
        }
    }
`;

const PageTitle: FC<HTMLProps<HTMLTitleElement>> = ({children,...props}) => {
    const version = useDesignVersion();
    return <PageTitleStyles className={`design-v__${version}`}>{children}</PageTitleStyles>
}
export default PageTitle;
