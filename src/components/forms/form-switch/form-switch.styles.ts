import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    .switch {
        display: flex;
        position: relative;
        &__cont {
            padding: 3px;
            border: 2px solid ${props => props.theme.vars.colors.light};
            color: ${props => props.theme.vars.colors.secondary};
            border-radius 6px;
        }
        &__activon {
            background-color: ${props => props.theme.vars.colors.primary};
            position: absolute;
            border-radius: 6px;
            top: 0;
            height: 100%;
            transition: ${p => p.theme.vars.defaults.transition};
        }
        &__item {
            transition: ${p => p.theme.vars.defaults.transition};
            ${p => p.theme.extend.flexCenter}
            cursor: pointer;
            position: relative;
            z-index:1;
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
                
            }
        }
    }
`;
