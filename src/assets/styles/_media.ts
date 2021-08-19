import vars from './_variables'
export const media =
  (size: 'mobile' | 'tablet' | 'desktop', minmax: 'min' | 'max') =>
  (content: TemplateStringsArray) =>
    `
    @media all and (${minmax}-width: ${vars.media[size]}px) {${content}}
`
