import styled from "styled-components";

export default styled.div`
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: 80px;
    border-top: 1px solid ${p => p.theme.vars.colors.light};
    z-index: ${p =>p.theme.vars.zIndex.footer};
    padding: 10px 27px;
    .calendar-footer {
        &__title {
            font-weight: 600;
            font-size: 18px;
            color: ${p => p.theme.vars.colors.primaryDark};
            opacity: .6;
        }
        &__add {
            position: absolute;
            top: 0;
            right: 16px;
            transform: translateY(-40%);
            width: 54px;
            height: 54px;
            padding: 16px;
            color: white;
            border-radius: 50%;
            background-color: ${p =>p.theme.vars.colors.primary};
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        }
    }
`;
