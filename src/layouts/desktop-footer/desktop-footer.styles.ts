import styled from "styled-components";

export default styled.div`
margin-top: auto;
background-color: white;
position: relative;
z-index: ${p => p.theme.vars.zIndex.footer};

width: calc(0vw + 70px);
overflow: hidden;
transition: ${p => p.theme.vars.defaults.transition};
@media all and (max-height: 800px) {
    width: calc(0vw + 42px);
}
&.footer__open {
    width: calc(100vw + 0px);
    border-top: 1px solid ${p => p.theme.vars.colors.secondary2};
    .footer__actions {
        padding: 21px 21px 40px 52px;
    }
}
.footer {
    
    &__wrapper {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    &__basic {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 40px 0 8px;
        height: 100%;
        position: relative;
        &:before {
            ${p =>p.theme.extend.pseudo}
            top:12px;
            bottom:12px;
            right:0;
            border-left: 1px solid ${p => p.theme.vars.colors.secondary2};
        }
        .profile-image__placeholder, img {
            ${p => p.theme.mixin.circleImage('40px')}
            flex-shrink: 0;
            cursor: pointer;
            font-size: 10px;
            display: flex !important;
            margin-right: 16px;
            margin-left:8px;
            @media all and (max-height: 800px) {
                ${p => p.theme.mixin.circleImage('30px')}
                margin-left: 0;
            }
        }
       
    }
    &__info {}
    &__name {
        font-size: 18px;
        font-weight: 600;
        color: ${p => p.theme.vars.colors.primaryDark};
        white-space: nowrap;
        max-width: 200px;
        overflow: hidden;
    }
    &__account-type {
        font-size: 16px;
        font-weight: 400;
        color: ${p => p.theme.vars.colors.secondary2};
        white-space: nowrap;
    }
    &__actions {
        padding: 21px 0px 40px 52px;
        &__title {
           font-size: 18px;
           font-weight: 600;
           color: ${p => p.theme.vars.colors.promaryDark};
           margin-bottom: 7px;
        }
        &__cont {
            display: flex;
            flex-wrap: wrap;
        }
        .ant-btn {
            padding: 6px 26px;
        }
        .ant-btn-ghost {
            color: ${p => p.theme.vars.colors.promaryDark};
            border-color: ${p => p.theme.vars.colors.secondary};
            opacity: .8;
        }
    }
    &__action {
        margin: 0 10px 10px 0;
        width: auto;
    }
    
}
`;
