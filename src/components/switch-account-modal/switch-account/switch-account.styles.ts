import styled from "styled-components";

export default styled.div`
width: 50%;
margin: 70px 0 0 0;
@media all and (max-width: ${p =>p.theme.vars.media.tablet}px){
    margin: 70px 0;
}
.swa-card {
    margin: 0 auto 14px auto;
    max-width: 350;
    display: flex;
            &__img {
                ${p => p.theme.mixin.circleImage('45px')}
            }
            &__info {
                margin: 0 auto 0 8px;
            }
            &__name {
                font-size: 14px;
                font-weight: 500;
                color: black;
            }
            &__type {
                font-size: 12px;
                color: ${p => p.theme.vars.colors.secondary};
            }
            &__add {
                height: 70px;
                border-radius:${p =>p.theme.vars.sizes.borderRadius};
                ${p => p.theme.mixin.dashedBorder(p.theme.vars.colors.secondary2)}
                ${p => p.theme.extend.flexCenter}
                svg {
                    color: ${p => p.theme.vars.colors.secondary2};
                }
            }
}
`;
