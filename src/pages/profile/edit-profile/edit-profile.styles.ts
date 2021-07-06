import styled from "styled-components";

export default styled.div`
    ${p => p.theme.extend.layout}
    .text_input__wrapper, .textarea__wrapper, .select_input__wrapper {
        padding-bottom: 26px;
    }
    .button-submit {
        
    }
    .image-upload__wrapper {
        margin:auto;
    }
    .edit-profile {
        &__hr {
            margin-top: 70px;
        }
        &__img {
            ${p =>p.theme.mixin.circleImage('86px')}
            display: block;
            margin: auto;
        }
        &__placeholder {
            ${p => p.theme.extend.flexCenter}
            margin: auto;
            width: 86px;
            height:86px;
            font-size: 36px;
            font-weight: 600;
            background-color: ${p => p.theme.vars.colors.primary};
            color:white;
        }
    }
`;
