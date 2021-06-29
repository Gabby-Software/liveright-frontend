import vars from "./_variables";

const mixin = {
    circleImage: (size: string) => `
        display: block;
        width:${size};
        height:${size};
        border-radius: 50%;
        object-fit:cover;
    `,
    dashedBorder: (color: string) => `
        background-image:   linear-gradient(to right, transparent 50%, ${color} 50%), 
                            linear-gradient(to right, transparent 50%, ${color} 50%), 
                            linear-gradient(to bottom, transparent 50%, ${color} 50%), 
                            linear-gradient(to bottom, transparent 50%, ${color} 50%);
        background-position: left top, left bottom, left top, right top;
        background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
        background-size: 22px 2px, 22px 2px, 2px 22px, 2px 22px;
    `
};

export default mixin;
