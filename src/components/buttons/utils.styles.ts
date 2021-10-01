export function getPadding(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '8px 16px'
    case 'md':
      return '11px 40px'
    default:
      switch (props.$var) {
        case 'text':
          return '11px'
        default:
          return '11px 36px'
      }
  }
}

export function getMobilePadding(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '16px'
    case 'md':
      return '8px 30px'
    default:
      return '0 20px'
  }
}

export function getFontSize(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '0.875rem'
    default:
      return '1rem'
  }
}

export function getHeight(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '36px'
    default:
      return '44px'
  }
}
