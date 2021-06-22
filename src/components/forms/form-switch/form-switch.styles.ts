import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    .switch {
        display: flex;
        border: 2px solid ${props => props.theme.vars.colors.light};
        color: ${props => props.theme.vars.colors.light};
        border-radius 6px;
        &__item {
            ${p => p.theme.extend.flexCenter}
            font-family: 'Work Sans', sans-serif;
            letter-spacing: .8px;
            font-weight: 600;
            font-size: 14px;
            width: 100%;
            padding: 11px;
            border: gray;
            margin: 3px;
            background-color: transparent;
            border-radius 6px;
            &__active {
                color: white;
                background-color: ${props => props.theme.vars.colors.primary};
            }
        }
    }
`;
