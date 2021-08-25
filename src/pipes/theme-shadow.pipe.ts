export function getShadow(shadow: string): any {
  return function (props: any): string {
    return props.theme.vars.shadows[shadow]
  }
}
