import vars from "./_variables";
export const media = (size: 'mobile'|'tablet'|'desktop', minmax: 'min'|'max') => (content:TemplateStringsArray) => `
    @media all and (${minmax}-width: ${vars.media[size]}px) {${content}}
`;
export const darken = (color: string, p: number) => {
    color = color.substring(1);
    const darker = (color: string) => Math.round(parseInt(color, 16)*p).toString(16);
    return '#'+darker(color.substring(0,2))+darker(color.substring(2,4))+color.substring(4);
}