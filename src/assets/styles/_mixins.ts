import vars from "./_variables";

const mixin = {
    circleImage: (size: string) => `
        width:${size};
        height:${size};
        border-radius: 50%;
        object-fit:cover;
    `
};

export default mixin;
