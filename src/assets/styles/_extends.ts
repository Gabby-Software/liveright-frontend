import mixin from './_mixins'
import vars from './_variables'
// import mixin from "./_mixins";

const extend = {
  flexCenter: `
        display: flex;
        justify-content: center;
        align-items: center;
    `,
  absCenter: `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    `,
  fixedCover: `
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height:100%;
    `,
  absCover: `
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
    `,
  pseudo: `
        content: '';
        position: absolute;
        display: block;
    `,
  onlyDesktop: `
        margin-left: auto;
        width: fit-content;
        position: relative;
        bottom: 5px;
        @media all and (max-width: ${vars.media.tablet - 1}px) {
            display: none;
        }
    `,
  onlyMobile: `
        @media all and (min-width: ${vars.media.tablet}px) {
            display: none;
        }
    `,
  layout: `
        padding: 39px 20px 160px 20px;
    `,
  title: `
        color: ${vars.colors.dark2};
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
    `,
  subtitle: `
        color: ${vars.colors.primaryDark};
        font-size: 16px;
        font-weight: 600;
    `,
  profileCard: `
            display: flex;
            &__img {
                ${mixin.circleImage('36px')}
            }
            &__info {
                margin: 0 auto 0 8px;
            }
            &__name {
                font-size: 12px;
                font-weight: 600;
                color: black;
            }
            &__type {
                font-size: 10px;
                color: ${vars.colors.secondary};
            }
    `,
  radioCircle: `
            &:before {
            content: '';
            display: block;
            border-radius: 50%;
            border: 2px solid ${vars.colors.inputBorder};
            width: 16px;
            height: 16px;
            padding:2px;
            margin-right: 13px;
            }
            &__active {
                &:before {
                    background: radial-gradient(circle at center, ${vars.colors.primaryDark} 40%, transparent 40%);
                    border-color: ${vars.colors.primaryDark};
                } 
            }
    `,
  big: `
        font-weight: 500;
        font-size: 32px;
        line-height: 140%;
    `,
  h1: `
        font-weight: 500;
        font-size: 24px;
        line-height: 140%;
    `,
  h2: `
        font-weight: 500;
        font-size: 18px;
        line-height: 140%;
    `,
  h3: `
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
    `,
  p1: `
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
    `,
  p2: `
        font-weight: 500;
        font-size: 12px;
        line-height: 140%;
    `,
  small: `
        font-weight: 500;
        font-size: 10px;
        line-height: 140%;
        letter-spacing: .8px;
    `,
  label: `
        color: ${vars.colors.secondary2_v2};
        font-size: 14px;
        font-weight: 300;
        text-align: left;
    `
}

export default extend
