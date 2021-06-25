import vars from "./_variables";
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
    absCover: `
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
    `,
    pseudo:`
        content: '';
        position: absolute;
        display: block;
    `,
    onlyDesktop:`
        margin-left: auto;
        width: fit-content;
        position: relative;
        bottom: 5px;
        @media all and (max-width: ${vars.media.tablet-1}px) {
            display: none;
        }
    `,
    onlyMobile:`
        @media all and (min-width: ${vars.media.tablet}px) {
            display: none;
        }
    `,
    layout:`
        padding: 39px 20px 160px 20px;
    `
};

export default extend;
