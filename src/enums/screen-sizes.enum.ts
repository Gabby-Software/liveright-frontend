export const screenSizes = {
  DESKTOP: 1100,
  TABLET: 720,
  MOBILE: 530
}

export const mediaQueries = {
  LANDSCAPE: '(orientation: landscape) and (hover: none) and (pointer: coarse)',
  MOBILE: `(orientation: landscape) and (hover: none) and (pointer: coarse), (max-width: ${screenSizes.MOBILE}px)`,
  TABLET: `(orientation: landscape) and (hover: none) and (pointer: coarse), (max-width: ${screenSizes.TABLET}px)`
}
