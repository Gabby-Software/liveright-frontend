import styled from "styled-components";

export default styled.section`
    .accounts {
        &__cont {
            display: flex;
            flex-wrap: wrap;
        }
        &__add {
            background-color: ${p =>p.theme.vars.colors.card};
            width: 247px;
            border-radius:${p =>p.theme.vars.sizes.borderRadius};
            background-image:   linear-gradient(to right, transparent 50%, ${p => p.theme.vars.colors.secondary2} 50%), 
                                linear-gradient(to right, transparent 50%, ${p => p.theme.vars.colors.secondary2} 50%), 
                                linear-gradient(to bottom, transparent 50%, ${p => p.theme.vars.colors.secondary2} 50%), 
                                linear-gradient(to bottom, transparent 50%, ${p => p.theme.vars.colors.secondary2} 50%);
            background-position: left top, left bottom, left top, right top;
            background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
            background-size: 22px 2px, 22px 2px, 2px 22px, 2px 22px;
            ${p => p.theme.extend.flexCenter}
            svg {
                color: ${p => p.theme.vars.colors.secondary2};
            }
        }
    }
`;
