export function getHeight(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '36px'
    default:
      return '44px'
  }
}
