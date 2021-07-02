import styled from "styled-components";

export default styled.div`
            ${p => p.theme.extend.flexCenter}
            aspect-ratio: 1;
            margin: 8px;
            width: 100%;
            font-weight: 600;
            font-size: 14px;
            position: relative;
            color: ${p =>p.theme.vars.colors.primaryDark};
            transition: ${p => p.theme.vars.defaults.transition};
             &:before {
                    ${p => p.theme.extend.pseudo}
                    ${p => p.theme.extend.absCover}
                    border-radius: 3px;
                    z-index: -1;
                    background-color: ${p =>p.theme.vars.colors.primary};
                    transition: ${p => p.theme.vars.defaults.transition};   
                    box-shadow: 0px 4px 10px rgba(247, 56, 80, 0.22);
                    transform-origin: center;
                    transform: scale(0) rotate(0);
             }
             &.calendar-day {
                &__disabled {
                    color: ${p =>p.theme.vars.colors.secondary2};
                }
                &__selected {
                    color: white;
                    &:before {
                        transform: scale(1) rotate(90deg);
                    }
                }
             }
        
`;
